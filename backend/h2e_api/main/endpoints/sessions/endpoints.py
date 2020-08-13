from flask import Blueprint
from flask import request

from flask_restful import Api
from flask_restful import Resource
from flask_restful_swagger import swagger

from h2e_api.main.endpoints.sessions.utils import create_session, get_all_sessions_by_filter
from h2e_api.main.endpoints.sessions.schemas import (
    CreateNewSessionSchema, ListSessionsRequestSchema, SessionListSchema
)


session_bp = Blueprint('sessions', __name__)
sessions_api = swagger.docs(Api(session_bp))


class CreateNewSession(Resource):
    @swagger.operation(
        notes='Create a Tutoring session',
        responseClass='ApplicationResponse',
        nickname='create_session',
        parameters=[
            {
                "name": "tutor",
                "description": "ID for the tutor of this session",
                "required": True,
                "allowMultiple": False,
                "dataType": 'string',
                "paramType": "body"
            },
            {
                "name": "student",
                "description": "ID of the student user for this session",
                "required": True,
                "allowMultiple": False,
                "dataType": 'string',
                "paramType": "body"
            },
            {
                "name": "start_time",
                "description": "",
                "required": True,
                "allowMultiple": False,
                "dataType": 'datetime',
                "paramType": "body"
            },
            {
                "name": "end_time",
                "description": "",
                "required": True,
                "allowMultiple": False,
                "dataType": 'datetime',
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Successful"
            },
            {
                "code": 400,
                "message": "Invalid data"
            }
        ]
    )
    def post(self):
        validated_input = CreateNewSessionSchema().load(request.json)
        session = create_session(validated_input)
        if session is not None:
            output = {'message': 'Success! session created'}, 200
        else:
            output = {'error': True, 'message': 'unknown user'}, 400

        return output

    def get(self):
        """
        User Id required in the query parameters
        """
        validated_input = ListSessionsRequestSchema().load(request.json)
        all_sessions = get_all_sessions_by_filter(validated_input)
        output = SessionListSchema(strict=True).dump(all_sessions).data
        return output


sessions_api.add_resource(CreateNewSession, '/sessions')
