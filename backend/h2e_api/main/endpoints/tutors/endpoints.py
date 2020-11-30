from flask import Blueprint
from flask import request
from flask import g

from flask_restful import Api
from flask_restful import Resource
from h2e_api.utils import check_endpoint_accessible
from h2e_api.main.endpoints.tutors.utils import get_all_tutors
from h2e_api.main.endpoints.tutors.schemas import TutorSchema

tutors_bp = Blueprint('tutors', __name__)
tutors_api = Api(tutors_bp)


class Tutors(Resource):
    @check_endpoint_accessible
    def get(self):
        validated_input = request.args.to_dict()
        tutors_list = get_all_tutors(**validated_input)
        return {
            'items': TutorSchema.dump(tutors_list, many=True),
            'count': len(tutors_list)
        }
