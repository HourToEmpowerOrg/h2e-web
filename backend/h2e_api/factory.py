import os
import logging
import threading

from flask import Flask
from flask import request
from flask_cors import CORS
from environs import Env

from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from h2e_api.config import config

#import sentry_sdk
#from sentry_sdk.integrations.flask import FlaskIntegration

#from augment_dao.models import db TODO: Timport DB here
from h2e_api.main.models.BaseModel import db
from h2e_api.main import main_bp
from h2e_api.main.endpoints.users.users import users_bp
from h2e_api.main.endpoints.front_end.endpoints import front_end_bp
from h2e_api.utils import util_send_file, not_authenticated_response

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

env = Env()
env.read_env()


def setup_static_file_loader(app: Flask):
    url_prefix = app.config['URL_PREFIX']

    @app.before_request
    def before_request():
        path = request.path
        if url_prefix != '' and path.startswith(url_prefix):
            path = path[len(url_prefix):]

        if path == '/static/index.html':
            print(f'sending file: {os.path.dirname(os.path.abspath(__file__)) + path}')
            return util_send_file(os.path.dirname(os.path.abspath(__file__)) + path, add_etags=False, cache_timeout=0)
        elif path.startswith('/static/') or path.startswith('/static/favicon/'):
            print(f'sending file: {os.path.dirname(os.path.abspath(__file__)) + path}')
            return util_send_file(os.path.dirname(os.path.abspath(__file__)) + path)


def create_app():
    """Application factory, used to create application
    """

    app = Flask(__name__, static_folder='/static', static_url_path='/')

    initilize_services(app)
    register_blueprints(app)

    CORS(app)
    env_name = env('FLASK_ENV', 'Development')
    app.config.from_object(config[env_name])
    #config[env_name].init_app(h2e_api)

    app.config.from_pyfile('instance_config.py', silent=True)

    setup_static_file_loader(app)

    db.init_app(app)

    print('Flask Server Initialized')
    return app


def initilize_services(app):
    # logger = logging.getLogger(__name__)
    db.init_app(app)
    from h2e_api.main import models

    # TODO: I think this may actually need to go in factory.py
    ma = Marshmallow(app)
    migrate = Migrate(app, db)
    CORS(app, max_age=3600)  # NOTE: max_age is capped at 600 for Chrome


def register_blueprints(app):
    """register all blueprints for application
    """
    app.register_blueprint(front_end_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(users_bp)
