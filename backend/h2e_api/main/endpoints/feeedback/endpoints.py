from flask import Blueprint
from flask import request
from flask import g

from flask_restful import Api
from flask_restful import Resource
from h2e_api.utils import check_endpoint_accessible
from h2e_api.main.endpoints.feeedback.utils import submit_feedback
from h2e_api.main.endpoints.feeedback.schemas import FeedbackSchema

feedback_bp = Blueprint('feedback', __name__)
feedback_api = Api(feedback_bp)


class Tutors(Resource):
    @check_endpoint_accessible('USER')
    def post(self):
        validated_input = FeedbackSchema().load(request.json)
        submit_feedback(g.user.id, validated_input)
        output = {'message': 'Feedback submitted!'}
        return output


feedback_api.add_resource(Tutors, '/feedback')
