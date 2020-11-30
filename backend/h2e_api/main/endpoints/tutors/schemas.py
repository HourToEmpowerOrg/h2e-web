from marshmallow import Schema
from marshmallow import fields


class TutorSchema(Schema):
    display_name = fields.String
    id = fields.String

    value = fields.String(attribute='id')
    label = fields.String(attribute='display_name')

