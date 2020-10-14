from flask import Blueprint
from flask import request
from flask import g

from flask_restful import Api
from flask_restful import Resource
from flask_restful_swagger import swagger

from h2e_api.main.endpoints.sessions.utils import (
    create_session,
    get_all_sessions_by_filter,
    get_session_info,
    update_session_note,
)
from h2e_api.main.endpoints.sessions.schemas import (
    CreateNewSessionSchema, ListSessionsRequestSchema, SessionListSchema,
    SessionDetailsSchema, SessionNoteSchema
)
from h2e_api.utils import check_endpoint_accessible


session_bp = Blueprint('sessions', __name__)
sessions_api = swagger.docs(Api(session_bp))


class Sessions(Resource):
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

    @check_endpoint_accessible('USER')
    def get(self):
        validated_input = ListSessionsRequestSchema().load(request.args.to_dict())
        sessions = get_all_sessions_by_filter(g.user.id, validated_input)
        output = SessionListSchema().dump(
            {
                'count': len(sessions),
                'sessions': sessions,
            })
        return output


class SessionDetails(Resource):
    @check_endpoint_accessible('USER')
    def get(self, session_id):
        session_info = get_session_info(session_id, g.user.id)
        return SessionDetailsSchema().dump({'session': session_info})


class SessionNote(Resource):
    @check_endpoint_accessible('USER')
    def post(self, session_id):
        validated_input = SessionNoteSchema().load(request.json)
        update_session_note(session_id, validated_input)
        return {'message': 'Note Updated'}, 200


sessions_api.add_resource(Sessions, '/sessions')
sessions_api.add_resource(SessionDetails, '/sessions/<string:session_id>')
sessions_api.add_resource(SessionNote, '/sessions/<string:session_id>/note')
