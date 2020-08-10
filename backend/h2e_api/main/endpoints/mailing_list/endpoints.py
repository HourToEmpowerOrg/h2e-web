from flask import Blueprint
from flask import request

from flask_restful import Api
from flask_restful import Resource

from h2e_api.main.endpoints.mailing_list.utils import create_mailing_follow_record

from marshmallow import Schema
from marshmallow import fields


class FollowSchema(Schema):
    email = fields.String()


mailing_bp = Blueprint('mailing', __name__)
mailing_api = Api(mailing_bp)


class SubmitFollowEmail(Resource):
    def post(self):
        validated_input = FollowSchema().load(request.json)
        record = create_mailing_follow_record(validated_input)
        if record is not None:
            output = {'message': 'Success! Added to the mailing list'}, 200
        else:
            output = {'error': True, 'message': 'Could not add email to list'}, 400

        return output


mailing_api.add_resource(SubmitFollowEmail, '/mailing/join')
