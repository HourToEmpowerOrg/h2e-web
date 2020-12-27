import os
import jwt
from json import dumps
from flask import g
from flask import make_response
from flask import send_file
from flask import request
from flask.wrappers import ResponseBase
from h2e_api.main.endpoints.auth.constants import (
    AUTH_TYPE_PASSWORD, AUTH_TYPE_COOKIE, AUTH_TYPE_HEADER,
    SUCCESS_MESSAGE, SUCCESS_TOKEN_NOT_UPDATED,
    ERROR_USER_NOT_FOUND,
    ERROR_INVALID_PERMISSION
)
from h2e_api.main.endpoints.auth.auth_lib import AuthLib
from h2e_api.main.models.user import User
from functools import wraps

import logging
import sys

COOKIE_NAME = 'hourtoempower'

# 30 Days
MAX_AGE_SECONDS = 60*60*24*30


def is_dev():
    return ':5000' in request.url_root or 'localhost' in request.url_root


def create_response(message='No Message Provided :(', code=400, headers=None):
    if headers is None:
        headers = {}

    if isinstance(message, str):
        payload = {
            'message': message
        }
    else:
        payload = message

    dumped = dumps(payload)
    resp = make_response(dumped, code, headers)
    return resp


def not_authenticated_response(message, status_code=401):
    token_payload = getattr(g, 'token_payload', {})
    auth_type = token_payload.get('auth_type', AUTH_TYPE_PASSWORD) if token_payload else AUTH_TYPE_PASSWORD

    resp = create_response({
        'message': message,
        'auth_type': auth_type
    }, status_code)

    return resp


def util_send_file(full_filepath, **kwargs):
    if os.path.isfile(full_filepath):
        return send_file(full_filepath, **kwargs)
    else:
        return create_response(f'{full_filepath} not found', 404)


def set_h2e_response(token, message, output=None, auth=AUTH_TYPE_HEADER):
    if output is None:
        resp = create_h2e_response_with_auth(token, message)
    elif isinstance(output, ResponseBase):
        resp = create_h2e_response_with_auth(token, message, resp=output, auth=auth)
    else:
        dumped = dumps(output)
        output = make_response(dumped)
        resp = create_h2e_response_with_auth(token, message, resp=output, auth=auth)

    return resp


def create_h2e_response_with_auth(token, message, resp=None, auth=AUTH_TYPE_HEADER):
    if resp is None:
        resp = not_authenticated_response(message)
    elif token == '' and message == 'Log Out' and resp:
        resp.set_cookie(COOKIE_NAME, token)
        resp.headers['Set-JWT-Authorization'] = token
        resp.headers['Access-Control-Expose-Headers'] = 'Set-JWT-Authorization'
    elif token and resp and message == SUCCESS_MESSAGE:
        if auth == AUTH_TYPE_HEADER:
            resp.headers['Set-JWT-Authorization'] = token
            resp.headers['Access-Control-Expose-Headers'] = 'Set-JWT-Authorization'
        elif auth == AUTH_TYPE_COOKIE:
            resp.set_cookie(COOKIE_NAME, 'JWT ' + token.decode("utf-8"), max_age=MAX_AGE_SECONDS)
        else:
            resp = not_authenticated_response('ERROR_INVALID_AUTH_TYPE')
    elif message == SUCCESS_TOKEN_NOT_UPDATED:
        pass

    else:
        resp = not_authenticated_response(message)

    return resp


def message_is_success(message):
    return message == SUCCESS_MESSAGE or message == SUCCESS_TOKEN_NOT_UPDATED


def check_logged_in(perm_name):
    # If user is not logged in, send error
    (payload, message, token, auth_type) = AuthLib.authenticate(request, os.environ.get('SECRET_KEY'))

    g.token_payload = payload

    if payload and message_is_success(message):
        user_q = User.query.filter(User.id == payload.get('user_id'))
        user = user_q.one_or_none()

        if user:
            g.user = user
        else:
            return token, ERROR_USER_NOT_FOUND, auth_type, 401

        if perm_name and perm_name not in ['DEFAULT', 'USER']:
            if user.user_type.name != perm_name:
                return token, ERROR_INVALID_PERMISSION, auth_type, 401

    return token, message, auth_type, 401


def is_logged_in():
    token, message, auth, status_code = check_logged_in('LOGGED_IN')
    return message_is_success(message)


def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, os.environ.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


def check_endpoint_accessible(perm_name):
    def check_endpoint_accessible_decorator(func):
        @wraps(func)
        def wrap(*args, **kwargs):
            """
                Metrics all api calls and checks login
            """
            try:
                token, message, auth, status_code = check_logged_in(perm_name)

                # Return with code 401 if there is an authorization error
                if not message_is_success(message):
                    return not_authenticated_response(message)


                transaction_name = request.method + ':' + request.path
                #NewRelicUtils.set_transaction_name(str(g.active_organization.id), transaction_name)

                # finally call f. f() now has access to g.user
                func_output = func(*args, **kwargs)
                to_return = set_h2e_response(token, message, func_output, auth=auth)

                # TODO: If we want to log / metric request calls we should do it here

            except Exception as e:
                (exc, value, tb) = sys.exc_info()
                logging.error(str(e), exc_info=(exc, value, tb))
                #newrelic.agent.record_exception(exc=exc, value=value, tb=tb)
                return {'message': str(e)}, getattr(e, 'code', 500)

            return to_return

        return wrap

    return check_endpoint_accessible_decorator