import os
from json import dumps
from flask import g
from flask import make_response
from flask import send_file
from flask import request

AUTH_TYPE_PASSWORD = 'password'
AUTH_TYPE_TOKEN = 'token'


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