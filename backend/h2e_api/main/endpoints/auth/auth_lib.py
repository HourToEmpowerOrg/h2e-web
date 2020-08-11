import jwt
import time
from h2e_api.main.endpoints.auth.constants import *


class AuthLib:

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
