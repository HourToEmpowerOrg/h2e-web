from flask import Blueprint
from flask import request

from flask_restful import Api
from flask_restful import Resource
from h2e_api.utils import check_endpoint_accessible
from h2e_api.main.endpoints.tutors.utils import get_all_tutors
from h2e_api.main.endpoints.tutors.schemas import TutorSchema, TutorListSchema

tutors_bp = Blueprint('tutors', __name__)
tutors_api = Api(tutors_bp)


class Tutors(Resource):
    @check_endpoint_accessible('USER')
    def get(self):
        # validated_input = request.args.to_dict() - for when filters are needed
        tutors_list = get_all_tutors()
        output = TutorListSchema().dump(
            {
                'items': tutors_list,
                'count': len(tutors_list)
            }
        )

        return output


tutors_api.add_resource(Tutors, '/tutors')
