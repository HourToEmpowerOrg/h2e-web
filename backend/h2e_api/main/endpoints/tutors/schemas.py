from marshmallow import Schema
from marshmallow import fields


class TutorSchema(Schema):
    label = fields.String(attribute='display_name')
    id = fields.String()


class TutorListSchema(Schema):
    items = fields.Nested(TutorSchema, many=True)
    count = fields.Integer()
