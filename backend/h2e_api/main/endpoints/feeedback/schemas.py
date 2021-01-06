from marshmallow import Schema
from marshmallow import fields


class FeedbackSchema(Schema):
    feedback_type = fields.String()
    message = fields.String()
