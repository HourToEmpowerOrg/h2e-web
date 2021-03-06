from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import OneOf
from flask import Blueprint
from flask import request
from flask import current_app
from flask import g
from flask_restful import Api
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from h2e_api.utils import check_endpoint_accessible

from h2e_api.utils import (
    set_h2e_response,
    AUTH_TYPE_COOKIE
)
from h2e_api.main.endpoints.auth.utils import check_user_login_information, create_new_user, update_user_pass
from h2e_api.main.models.enums import UserType

auth_bp = Blueprint('authentication', __name__)
auth_api = Api(auth_bp)


class LoginRequestSchema(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)


class UpdateShema(Schema):
    pass_update = fields.String(required=True)


class UserSchema(Schema):
    email = fields.String()
    display_name = fields.String()
    name = fields.String()


class SignUpRequestSchema(Schema):
    """
        USER SIGNUP STILL IN DEVELOPMENT
        AND IS NOT SELF SERVICE
    """
    email = fields.String(required=True)
    password = fields.String(required=True)
    username = fields.String(required=False)
    name = fields.String(required=False)
    user_type = fields.String(required=True, validate=OneOf([ut.value for ut in UserType]))
    behalf = fields.String()


class Login(Resource):
    def post(self):
        validated_data = LoginRequestSchema().load(request.json)
        return check_user_login_information(validated_data, AUTH_TYPE_COOKIE, request)


class UserUpdatePassword(Resource):
    @check_endpoint_accessible('USER')
    def post(self):
        validated_data = UpdateShema().load(request.json)
        new_pass = validated_data['pass_update']
        user_id = g.user.id
        update_user_pass(user_id, new_pass)
        return {'message': "Updated password"}


class Logout(Resource):
    def post(self):
        response = current_app.make_response("")
        return set_h2e_response('', 'Log Out', response)


class Signup(Resource):
    def post(self):
        validated_data = SignUpRequestSchema().load(request.json)
        behalf = validated_data.get('behalf')  # Check if this user was created by admin
        if validated_data['user_type'] == 'TUTOR':
            display = 'Tutor'
        else:
            display = 'Student'

        try:
            user = create_new_user(
                email=validated_data['email'],
                password=validated_data['password'],
                user_type=validated_data['user_type'],
                username=validated_data.get('username'),
                name=validated_data.get('name'),
                display_name=display,
                behalf=behalf,
            )

            if behalf == 'ADMIN':
                return UserSchema().dump(user)
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
auth_api.add_resource(Logout, '/logout')
auth_api.add_resource(Signup, '/signup')
auth_api.add_resource(UserUpdatePassword, '/update')  # TODO: This endpoint should be more secure
