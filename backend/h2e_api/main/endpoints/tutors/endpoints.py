from flask import Blueprint
from flask import request

from flask_restful import Api
from flask_restful import Resource
from h2e_api.utils import check_endpoint_accessible
from h2e_api.main.endpoints.tutors.utils import get_all_tutors, get_tutor_page_data
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


class TutorPublicPage(Resource):
    def get(self, page_id):
        page_data = get_tutor_page_data(page_id)
        return page_data


tutors_api.add_resource(Tutors, '/tutors')
tutors_api.add_resource(TutorPublicPage, '/tutors/pages/<string:page_id>')
