from flask import Blueprint
from flask import request
from flask import g

from flask_restful import Api
from flask_restful import Resource
from flask_restful_swagger import swagger

from h2e_api.main.endpoints.preferences.utils import create_schedule_item, get_all_schedule_items_by_filter, delete_schedule_item
from h2e_api.main.endpoints.preferences.schemas import (
    CreateNewScheduleItemSchema, ListSchdeuleItemsRequestSchema, ScheduleItemListSchema
)
from h2e_api.utils import check_endpoint_accessible


preferences_bp = Blueprint('preferences', __name__)
preferences_api = swagger.docs(Api(preferences_bp))


class ScheduleItems(Resource):
    @swagger.operation(
        notes='Create a Schedule Item: Cooresponds to a block of time for which a tutor is available',
        responseClass='Response',
        nickname='create_schedule',
        parameters=[
            {
                "name": "user_id",
                "description": "ID for the tutor user",
                "required": True,
                "allowMultiple": False,
                "dataType": 'string',
                "paramType": "body"
            },
            {
                "name": "start_time",
                "description": "",
                "required": True,
                "allowMultiple": False,
                "dataType": 'datetime',
                "paramType": "body"
            },
            {
                "name": "end_time",
                "description": "",
                "required": True,
                "allowMultiple": False,
                "dataType": 'datetime',
                "paramType": "body"
            },
            {
                "name": "day",
                "description": "Day of week, 0 for Monday",
                "required": True,
                "allowMultiple": False,
                "dataType": 'number',
                "paramType": "body"
            },
            {
                "name": "repeat",
                "description": "one of WEEKDAY, WEEKLY, BI_WEEEKLY",
                "required": True,
                "allowMultiple": False,
                "dataType": 'string',
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Successful"
            },
            {
                "code": 400,
                "message": "Invalid data"
            }
        ]
    )
    def post(self):
        validated_input = CreateNewScheduleItemSchema().load(request.json)
        item = create_schedule_item(validated_input)
        if item is not None:
            output = {'message': 'Success! Schedule Item created'}, 200
        else:
            output = {'error': True, 'message': 'unknown user'}, 400

        return output

    @check_endpoint_accessible('TEST')
    def get(self):
        """
        User Id required in the query parameters
        """
        validated_input = ListSchdeuleItemsRequestSchema().load(request.args.to_dict())
        user_schedule = get_all_schedule_items_by_filter(g.user.id, validated_input)
        output = ScheduleItemListSchema().dump(
            {
                'count': len(user_schedule),
                'items': user_schedule,
            })
        return output


class EditScheduleItem(Resource):
    def delete(self, item_id):
        try:
            delete_schedule_item(item_id)
            return  {'message': 'Success! Schedule Item deleted'}, 200
        except Exception as e:
            print(e)
            return {'message': 'Error! Schedule Item not deleted'}, 500


preferences_api.add_resource(ScheduleItems, '/preferences/schedule')
preferences_api.add_resource(EditScheduleItem, '/preferences/schedule/<string:item_id>')
