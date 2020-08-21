from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import OneOf


class ScheduleItemSchema(Schema):
    id = fields.String()

    class Meta:
        additional = ("start_time", "end_time", "created_at", "repeat_type", "day")


class CreateNewScheduleItemSchema(Schema):
    start_time = fields.Time()
    end_time = fields.Time()
    time_zone = fields.String()
    tutor = fields.UUID()
    repeat = fields.String()
    day = fields.Integer()


class ListSchdeuleItemsRequestSchema(Schema):
    user_id = fields.String()
    sort_key = fields.String(required=False, validate=OneOf(['day']))


class ScheduleItemListSchema(Schema):
    count = fields.Integer()
    items = fields.Nested(ScheduleItemSchema, many=True)