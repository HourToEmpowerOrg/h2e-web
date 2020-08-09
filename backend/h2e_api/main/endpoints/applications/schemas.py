from marshmallow import Schema
from marshmallow import fields


class SubjectSchema(Schema):
    id = fields.String()


class TutorApplicationSchema(Schema):
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    zip = fields.String(required=True)
    subjects = fields.Nested(SubjectSchema, many=True)
