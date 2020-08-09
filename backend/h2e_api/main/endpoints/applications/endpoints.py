from flask import Blueprint
from flask import request

from flask_restful import Api
from flask_restful import Resource
from flask_restful_swagger import swagger

from h2e_api.main.endpoints.applications.utils import submit_application
from h2e_api.main.endpoints.applications.schemas import TutorApplicationSchema
from h2e_api.main.endpoints.applications.constants import ApplicationType


applications_bp = Blueprint('applications', __name__)
applications_api = swagger.docs(Api(applications_bp))


class SubmitTutorApplication(Resource):
    @swagger.operation(
        notes='Submit a ',
        responseClass='ApplicationResponse',
        nickname='submit_tutor_app',
        parameters=[
            {
                "name": "name",
                "description": "",
                "required": True,
                "allowMultiple": False,
                "dataType": 'string',
                "paramType": "body"
            },
            {
                "name": "email",
                "description": "",
                "required": True,
                "allowMultiple": False,
                "dataType": 'string',
                "paramType": "body"
            },
            {
                "name": "zip",
                "description": "",
                "required": True,
                "allowMultiple": False,
                "dataType": 'string',
                "paramType": "body"
            },
            {
                "name": "subjects",
                "description": "Subjects the tutor has interest in tutoring",
                "required": True,
                "allowMultiple": False,
                "dataType": 'array',
                "paramType": "body"
            }
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Successful"
            },
            {
                "code": 400,
                "message": "Invalid Submission data"
            }
        ]
    )
    def post(self):
        validated_input = TutorApplicationSchema().load(request.json)
        application = submit_application(ApplicationType.Tutor, validated_input)
        if application is not None:
            output = {'message': 'Success! Application submitted'}, 200
        else:
            output = {'error': True, 'message': 'unknown user'}, 400

        return output


applications_api.add_resource(SubmitTutorApplication, '/applications/tutor')
