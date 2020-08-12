import os
from json import dumps
from flask import g
from flask import make_response
from flask import send_file
from flask import request
from flask.wrappers import ResponseBase
from h2e_api.main.endpoints.auth.constants import (
    AUTH_TYPE_PASSWORD, AUTH_TYPE_COOKIE, AUTH_TYPE_HEADER,
    SUCCESS_MESSAGE, SUCCESS_TOKEN_NOT_UPDATED,
    ERROR_USER_NOT_FOUND
)
from h2e_api.main.endpoints.auth.auth_lib import AuthLib

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
    elif isinstance(output, (dict, list)):
        dumped = dumps(output)
        output = make_response(dumped)
        resp = create_h2e_response_with_auth(token, message, resp=output, auth=auth)
    else:
        resp = create_h2e_response_with_auth('', 'ERROR_INVALID_ENDPOINT_RETURN_TYPE')

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
        # NOTE: it is intentional that the query does not have org_id as a filter to suport multi-org
        user_q = User.query.filter(User.id == payload.get('user_id'))
        user = user_q.one_or_none()

        if user:
            g.user = user
        else:
            return token, ERROR_USER_NOT_FOUND, auth_type, 401

    return token, message, auth_type, 401


def is_logged_in():
    token, message, auth, status_code = check_logged_in(LOGGED_IN)
    return message_is_success(message)