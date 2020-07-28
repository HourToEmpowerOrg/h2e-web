from flask import Blueprint
from flask import request
from flask_restful import Api
from flask_restful import Resource
import logging

logger = logging.getLogger(__name__)

main_bp = Blueprint('main', __name__)
main_api = Api(main_bp)


class HealthCheck(Resource):
    def get(self):
        logger.debug('/health endpoint :p')
        output = {'error': False, 'message': 'Server Healthy!'}, 200
        return output


main_api.add_resource(HealthCheck, '/health')
