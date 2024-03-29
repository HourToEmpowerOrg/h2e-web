from marshmallow import Schema, fields
from marshmallow.validate import OneOf
from h2e_api.main.models.enums import SessionStatus


class ListBookingsRequestSchema(Schema):
    date = fields.DateTime()
    subject = fields.String()
    tutor = fields.UUID()


class BookingSchema(Schema):
    tutor_name = fields.String()
    tutor_id = fields.UUID()
    start_time = fields.DateTime()
    end_time = fields.DateTime()
    duration = fields.TimeDelta()
    title = fields.String(missing='Hour To Empower Tutoring Session')


class BookingsListSchema(Schema):
    bookings = fields.Nested(BookingSchema, many=True)
    count = fields.Integer()


class BookingResponseSchema(Schema):
    response = fields.String(validate=OneOf([s.name for s in SessionStatus]))
