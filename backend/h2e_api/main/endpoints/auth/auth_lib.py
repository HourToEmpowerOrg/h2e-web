import jwt
import time
from h2e_api.main.endpoints.auth.constants import *


class AuthLib:

    # Updates token with new expiration if update_time has passed, or returns None with message
    @classmethod
    def _update_token(cls, token_tuple, secret_key):
        try:
            (token_type, token) = token_tuple
            token_payload = jwt.decode(token, secret_key)

            if token_type == "JWT":

                # Check to see if updated
                if token_payload['update_time'] < time.time():
                    return cls._generate_updated_token(secret_key, token_payload, token_type)

                # Return if update not ready
                else:
                    return token, SUCCESS_TOKEN_NOT_UPDATED

            else:
                return None, ERROR_INVALID_TYPE_MESSAGE

        except jwt.ExpiredSignatureError:
            raise
        except Exception as e:
            print("Auth Service Exception: " + str(e))
            return None, ERROR_UNRECOGNIZED_EXCEPTION_MESSAGE

    # Creates an updated token with same expire time in minutes and update time in minutes as in the existing token
    @classmethod
    def _generate_updated_token(cls, secret_key, existing_payload, token_type):
        try:
            if token_type == "JWT":

                # Get the objects for expire_time, initial time and update_time from existing token
                expire_time = existing_payload['exp']
                initial_creation_time = existing_payload['iat']
                update_time = existing_payload['update_time']

                # Calculate starting exp_time_in_minutes and update_time_in_minutes
                exp_time_in_minutes = (expire_time - initial_creation_time) // 60
                update_time_in_minutes = (update_time - initial_creation_time) // 60

                # Generate new token
                return cls.generate_token(secret_key, existing_payload, token_type, exp_time_in_minutes,
                                          update_time_in_minutes)

            else:
                return None, ERROR_INVALID_TYPE_MESSAGE

        except Exception as e:
            print("Auth Service Exception: " + str(e))
            return None, ERROR_UNRECOGNIZED_EXCEPTION_MESSAGE

    @classmethod
    def _extract_token_from_auth_header(cls, request):
        try:
            if 'Authorization' not in request.headers:
                return None, ERROR_NO_AUTH_COOKIE

            authorization_header = request.headers['Authorization'].split(' ')

            if not len(authorization_header) == 2:
                return None, ERROR_INVALID_AUTH_HEADER

            authorization_type = authorization_header[0]
            authorization_token = authorization_header[1]

            return (authorization_type, authorization_token), SUCCESS_MESSAGE
        except Exception as e:
            print("Auth Service Exception: " + str(e))
            return None, ERROR_UNRECOGNIZED_EXCEPTION_MESSAGE

    # Sets up a dictionary with given params and returns it
    @classmethod
    def _setup_payload(cls, params, exp_time_in_minutes, time_to_update_token_in_minutes):
        # Initially set_up payload with params
        payload = dict()
        for key in params:
            if key != 'exp' and key != 'update_time' and key != 'iat':
                payload[key] = params[key]

        # Create current time objects
        current_time = time.time()

        # Create expire time objects
        exp_time = current_time + exp_time_in_minutes * 60

        # Create update time objects
        update_time = current_time + time_to_update_token_in_minutes * 60

        payload['exp'] = exp_time
        payload['iat'] = current_time
        payload['update_time'] = update_time

        return payload

    @classmethod
    def _extract_token_from_auth_cookie(cls, request):
        try:
            if 'hourtoempower' not in request.cookies:
                return None, ERROR_NO_AUTH_COOKIE

            authorization_cookie = request.cookies['hourtoempower'].split(' ')

            if not len(authorization_cookie) == 2:
                return None, ERROR_INVALID_AUTH_COOKIE

            authorization_type = authorization_cookie[0]
            authorization_token = authorization_cookie[1]

            return (authorization_type, authorization_token), SUCCESS_MESSAGE
        except Exception as e:
            print("Auth Service Exception: " + str(e))
            return None, ERROR_UNRECOGNIZED_EXCEPTION_MESSAGE

    # Decodes the token and returns it, or returns None with error message
    @classmethod
    def _validate_token(cls, token_tuple, secret_key):
        try:
            (token_type, token) = token_tuple
            try:
                if token_type == "JWT":

                    (updated_token, message) = cls._update_token(token_tuple, secret_key)

                    return jwt.decode(updated_token, secret_key), message, updated_token

                else:
                    return None, ERROR_INVALID_TYPE_MESSAGE, None

            # If the signature is expired
            except jwt.ExpiredSignatureError:
                payload = jwt.decode(token, secret_key, verify=False)
                return payload, ERROR_TOKEN_EXPIRED, None

            # If the token is invalid
            except jwt.InvalidTokenError:
                return None, ERROR_INVALID_TOKEN, None

        # If decoding raises another error
        except Exception as e:
            print('Auth Service Exception: ' + str(e))
            return None, ERROR_UNRECOGNIZED_EXCEPTION_MESSAGE, None

    # Generates a token based on the given params, or returns None with error message
    @classmethod
    def generate_token(cls, secret_key, params, token_type,
                       exp_time_in_minutes=60 * 24 * 30, time_to_update_token_in_minutes=60 * 24,
                       **kwargs):
        try:
            if token_type == "JWT":

                if exp_time_in_minutes < 0:
                    return None, ERROR_EXPIRATION_TIME_MESSAGE

                payload = cls._setup_payload(params, exp_time_in_minutes, time_to_update_token_in_minutes)

                token = jwt.encode(payload, secret_key)

                if token:
                    return token, SUCCESS_MESSAGE
                else:
                    return None, ERROR_ENCODING_MESSAGE
            else:
                return None, ERROR_INVALID_TYPE_MESSAGE

        except Exception as e:
            print("Auth Service Exception: " + str(e))
            return None, ERROR_UNRECOGNIZED_EXCEPTION_MESSAGE

    @classmethod
    def authenticate(cls, request, secret_key):
        payload = None
        try:
            (auth_tuple, message) = cls._extract_token_from_auth_cookie(request)
            if message == SUCCESS_MESSAGE:
                authorization_type, authorization_token = auth_tuple

                # Validate the token in the authorization header before logging in
                (payload, message, token) = cls._validate_token((authorization_type, authorization_token),
                                                                secret_key)

                if payload and (message == SUCCESS_MESSAGE or message == SUCCESS_TOKEN_NOT_UPDATED):
                    return payload, message, token, AUTH_TYPE_COOKIE
            existing_message = message
            (auth_tuple, message) = cls._extract_token_from_auth_header(request)
            if message == SUCCESS_MESSAGE:
                authorization_type, authorization_token = auth_tuple
                # Validate the token in the authorization header before logging in
                (payload, message, token) = cls._validate_token((authorization_type, authorization_token),
                                                                secret_key)
                if payload and (message == SUCCESS_MESSAGE or message == SUCCESS_TOKEN_NOT_UPDATED):
                    return payload, message, token, AUTH_TYPE_HEADER
            else:
                return payload, existing_message, None, None

            return None, message, None, None
        except Exception as e:
            print("Auth Service Exception: " + str(e))
            return None, ERROR_UNRECOGNIZED_EXCEPTION_MESSAGE, None, None
