from marshmallow import Schema
from marshmallow import fields


class ListBookingsRequestSchema(Schema):
    date_from = fields.DateTime()
    date_to = fields.DateTime()


class BookingSchema(Schema):
    tutor_name = fields.String()
    start_time = fields.DateTime()
    end_time = fields.DateTime()
    duration = fields.Integer() # In minutes


class BookingsListSchema(Schema):
    bookings = fields.Nested(BookingSchema, many=True)
    count = fields.Integer()
