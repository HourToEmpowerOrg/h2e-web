from uuid import UUID
from typing import Union
from datetime import datetime
import json
import os
from flask import g
from flask import make_response

import pytz

from h2e_api.main.models.user import User
from h2e_api.main.models.enums import UserType, UserStatus
from h2e_api.main.endpoints.auth.auth_lib import AuthLib

from h2e_api.factory import db

from h2e_api.main.endpoints.auth.constants import (
    AUTH_TYPE_PASSWORD,
    SUCCESS_MESSAGE
)


def make_login_payload(user):
    payload = {
        'user_id': str(user.id),
        'username': user.username,
        'role': user.user_type,
        'email': user.email,
        'display_name': user.display_name,
        'timezone': user.timezone
    }
    # If you need to overwrite any app settings for a user, good idea to do it to the payload here!
    return payload


def make_login_response(user, auth_type=AUTH_TYPE_PASSWORD, **kwargs):
    secret_key = os.environ.get('SECRET_KEY')
    payload = make_login_payload(user)

    # Generate a new token for the new login, with additional saved data.
    (token, message) = AuthLib.generate_token(secret_key, {'user_id': str(user.id), 'auth_type': auth_type},
                                              "JWT",
                                              **kwargs)

    resp = make_response(json.dumps(payload))

    return token, message, resp


def _make_h2e_response(user, message, auth, request, call_start_time, auth_type):
    from h2e_api.utils import set_h2e_response

    g.token_payload = {
        'auth_type': auth_type
    }

    if message == SUCCESS_MESSAGE:
        kwargs = {} if auth_type == AUTH_TYPE_PASSWORD else {
            'exp_time_in_minutes': 30,
            'time_to_update_token_in_minutes': 60 * 24 * 365 * 100
        }
        token, message, resp = make_login_response(user, auth_type, **kwargs)

        call_end_time = datetime.now(pytz.utc)

        payload = request.get_json() if request.is_json else None
        if payload:
            if 'password' in payload:
                del payload['password']

        #_send_login_metric(user, request, call_start_time, call_end_time, payload)

        return set_h2e_response(token, message, resp, auth=auth)

    else:
        return set_h2e_response(None, message)


def validate_login(auth_json):
    user = User.query.filter_by(email=auth_json['email']).first()

    if not user.check_password(auth_json['password']):
        return None, 'ERROR_INVALID_PASSWORD'

    user.last_login = datetime.now()
    db.session.add(user)
    db.session.commit()

    return user, SUCCESS_MESSAGE


def check_user_login_information(auth_json, auth, request):
    call_start_time = datetime.now(pytz.utc)
    auth_json['username'] = auth_json.get('username', '').lower()
    user, message = validate_login(auth_json=auth_json)

    return _make_h2e_response(user, message, auth, request, call_start_time, AUTH_TYPE_PASSWORD)


def create_new_user(email, password, user_type, **kwargs):
    user = User(email=email,
                name=kwargs.get('name'),
                username=kwargs.get('username', email),
                user_type=user_type,
                user_status=UserStatus.ACTIVE)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user.id


