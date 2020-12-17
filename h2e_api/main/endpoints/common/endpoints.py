from flask import Blueprint
from flask_restful import Resource
from flask_restful import Api
from h2e_api.main.endpoints.common.utils.config_utils import get_config
from h2e_api.utils import check_endpoint_accessible

common_bp = Blueprint('common', __name__)
common_api = Api(common_bp)


class Config(Resource):
    @check_endpoint_accessible('USER')
    def get(self):
        config = get_config()
        if config is None:
            return {'message': 'No config for that user'}
        return config


common_api.add_resource(Config, '/config')
