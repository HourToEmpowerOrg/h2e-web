from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import OneOf
from h2e_api.main.models.enums import SessionStatus


class SessionSchema(Schema):
    id = fields.UUID()
    session_info = fields.Dict()
    note = fields.String()
    participant_name = fields.String()
    participant_email = fields.String()

    class Meta:
        additional = ("title", "start_time", "end_time", "created_at", "duration", "session_status")


class SessionDetailsSchema(Schema):
    session = fields.Nested(SessionSchema)


class CreateNewSessionSchema(Schema):
    start_time = fields.DateTime()
    end_time = fields.DateTime()
    tutor = fields.String()
    student = fields.String()
    title = fields.String()


class ListSessionsRequestSchema(Schema):
    user_id = fields.String()
    date_from = fields.Date()
    date_to = fields.Date()
    status = fields.String(validate=OneOf([s.name for s in SessionStatus]))


class SessionListSchema(Schema):
    count = fields.Integer()
    sessions = fields.Nested(SessionSchema, many=True)
    pending = fields.Nested(SessionSchema, many=True)


class SessionNoteSchema(Schema):
    text = fields.String()
