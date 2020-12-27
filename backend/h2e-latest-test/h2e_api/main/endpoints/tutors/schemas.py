from marshmallow import Schema
from marshmallow import fields


class TutorSchema(Schema):
    display_name = fields.String()
    id = fields.String()


class TutorListSchema(Schema):
    items = fields.Nested(TutorSchema, many=True)
    count = fields.Integer()
