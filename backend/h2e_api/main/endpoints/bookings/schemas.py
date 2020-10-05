from marshmallow import Schema
from marshmallow import fields

from marshmallow.validate import OneOf


class ListBookingsRequestSchema(Schema):
    date_from = fields.DateTime()
    date_to = fields.DateTime()
    subject = fields.String()


class BookingSchema(Schema):
    tutor_name = fields.String()
    tutor_id = fields.UUID()
    start_time = fields.DateTime()
    end_time = fields.DateTime()
    duration = fields.Integer() # In minutes


class BookingsListSchema(Schema):
    bookings = fields.Nested(BookingSchema, many=True)
    count = fields.Integer()


class BookingResponseSchema(Schema):
    session_status = fields.String(validate=OneOf(['ACCEPTED', 'DENIED']))
    session_id = fields.UUID()
