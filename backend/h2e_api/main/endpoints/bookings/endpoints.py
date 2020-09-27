from flask import Blueprint
from flask import request
from flask import g

from flask_restful import Api
from flask_restful import Resource
from flask_restful_swagger import swagger

from h2e_api.main.endpoints.bookings.utils import (
    get_all_bookings_by_filter,

)
from h2e_api.main.endpoints.bookings.schemas import (
    ListBookingsRequestSchema,
    BookingsListSchema
)
from h2e_api.utils import check_endpoint_accessible


bookings_bp = Blueprint('bookings', __name__)
bookings_api = swagger.docs(Api(bookings_bp))


class PotentialBookings(Resource):
    @swagger.operation(
        notes='Get all Potential upcoming Bookings',
        responseClass='ApplicationResponse',
        nickname='geet_bookings',
        parameters=[
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
    @check_endpoint_accessible('DEFAULT')
    def get(self):
        """
        User Id required in the query parameters
        """
        validated_input = ListBookingsRequestSchema().load(request.args.to_dict())
        all_bookings = get_all_bookings_by_filter(g.user.id, validated_input)
        output = BookingsListSchema().dump(
            {
                'count': len(all_bookings),
                'bookings': all_bookings,
            })
        return output


class AcceptBooking(Resource):
    #TODO: Create new session request
    def post(self):
        pass


bookings_api.add_resource(PotentialBookings, '/bookings')
