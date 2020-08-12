from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import OneOf
from flask import Blueprint
from flask import request

from flask_restful import Api
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from h2e_api.utils import (
    set_h2e_response,
    AUTH_TYPE_COOKIE
)
from h2e_api.main.endpoints.auth.utils import check_user_login_information, create_new_user
from h2e_api.main.models.enums import UserType

auth_bp = Blueprint('authentication', __name__)
auth_api = Api(auth_bp)


class LoginRequestSchema(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)


class SignUpRequestSchema(Schema):
    """
        USER SIGNUP STILL IN DEVELOPMENT
        AND IS NOT SELF SERVICE
    """
    email = fields.String(required=True)
    password = fields.String(required=True)
    username = fields.String(required=False)
    user_type = fields.String(required=True, validate=OneOf([ut.value for ut in UserType]))


class Login(Resource):
    def post(self):
        validated_data = LoginRequestSchema().load(request.json)
        return check_user_login_information(validated_data, AUTH_TYPE_COOKIE, request)


class Signup(Resource):
    def post(self):
        validated_data = SignUpRequestSchema().load(request.json)
        # Create a new user with that email
        try:
            user_id = create_new_user(email=validated_data['email'],
                                      password=validated_data['password'],
                                      user_type=validated_data['user_type'],
                                      username=validated_data.get('username'))
            # Get token for new user
            login_data = {
                'email': validated_data['email'],
                'password': validated_data['password']
            }
            return check_user_login_information(login_data, AUTH_TYPE_COOKIE, request)

        except IntegrityError as e:
            return {'error': f"user with email {validated_data['email']} already exists"}, 400

        except Exception as e:
            return {'error': f'{e}'}, 500


auth_api.add_resource(Login, '/login')
auth_api.add_resource(Signup, '/signup')
