from marshmallow import Schema
from marshmallow import fields


class SessionSchema(Schema):
    id = fields.String()
    session_info = fields.Dict()

    class Meta:
        additional = ("title", "start_time", "end_time", "created_at", "duration")


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
    status = fields.String() #TODO: Need to add a session status to filter for upcoming sessions


class SessionListSchema(Schema):
    count = fields.Integer()
    sessions = fields.Nested(SessionSchema, many=True)