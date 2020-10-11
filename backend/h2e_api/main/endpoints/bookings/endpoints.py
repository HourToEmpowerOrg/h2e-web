from flask import Blueprint
from flask import request
from flask import g

from flask_restful import Api
from flask_restful import Resource
from flask_restful_swagger import swagger

from h2e_api.main.endpoints.bookings.utils import (
    get_all_bookings_by_filter,
    create_booking_request,
    respond_to_booking,
)
from h2e_api.main.endpoints.bookings.schemas import (
    ListBookingsRequestSchema,
    BookingsListSchema,
    BookingSchema,
    BookingResponseSchema,
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


class RequestBooking(Resource):
    """
        Called when Student hits "Book Session" in UI
    """
    @check_endpoint_accessible('STUDENT')
    def post(self):
        validated_input = BookingSchema().load(request.json)
        booking = create_booking_request(g.user.id, validated_input)
        return BookingSchema().dump(booking)


class RespondBooking(Resource):
    """
        Called when Tutor hits "accept this session" or "decline"
    """
    @check_endpoint_accessible('TUTOR')
    def post(self, session_id):
        validated_input = BookingResponseSchema().load(request.json)
        booking = respond_to_booking(session_id, validated_input)
        return BookingSchema().dump(booking)


bookings_api.add_resource(PotentialBookings, '/bookings')
bookings_api.add_resource(RequestBooking, '/bookings/request')
bookings_api.add_resource(RespondBooking, '/bookings/respond/<string:session_id>')
