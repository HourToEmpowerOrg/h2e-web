from marshmallow import Schema
from marshmallow import fields


class SubjectSchema(Schema):
    id = fields.String()
    display = fields.String()


class TutorApplicationSchema(Schema):
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    zip = fields.String(required=True)
    subjects = fields.Nested(SubjectSchema, many=True)
    created = fields.DateTime(attribute='created_at')


class SchoolApplicationSchema(Schema):
    name = fields.String(required=True)  # School name
    email = fields.String(required=True)
    phone = fields.String(required=True)

    city = fields.String(required=True)
    state = fields.String(required=True)

    contact_name = fields.String(required=True)


class ApplicationListSchema(Schema):
    items = fields.Nested(TutorApplicationSchema, many=True)
    count = fields.Integer()
