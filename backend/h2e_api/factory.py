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

from h2e_api.main.models.BaseModel import db
from h2e_api.main import main_bp
from h2e_api.main.endpoints.users.users import users_bp
from h2e_api.main.endpoints.front_end.endpoints import front_end_bp
from h2e_api.main.endpoints.applications.endpoints import applications_bp
from h2e_api.main.endpoints.mailing_list.endpoints import mailing_bp
from h2e_api.main.endpoints.sessions.endpoints import session_bp
from h2e_api.main.endpoints.bookings.endpoints import bookings_bp
from h2e_api.main.endpoints.preferences.endpoints import preferences_bp
from h2e_api.main.endpoints.auth.endpoints import auth_bp
from h2e_api.main.endpoints.common.endpoints import common_bp
from h2e_api.main.endpoints.tutors.endpoints import tutors_bp
from h2e_api.utils import util_send_file, not_authenticated_response

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

env = Env()
env.read_env()

api_prefix = '/api/v1'


def setup_static_file_loader(app: Flask):
    static_prefix = app.config['STATIC_PREFIX']

    @app.before_request
    def before_request():
        path = request.path
        if static_prefix != '' and static_prefix in path:
            path = path[path.index(static_prefix):]

        if path == '/static/index.html':
            return util_send_file(os.path.dirname(os.path.abspath(__file__)) + path, add_etags=False, cache_timeout=0)
        elif path.startswith('/static/') or path.startswith('/static/favicon/'):
            """
                TODO: There is definitely a beter way to do this
                But right now we have our static resources inside a static folder within the static directory, so we
                need to have all static resources loaded from /static/static, for some reason on second load the 
                web app requests resources from just the /static path
            """
            if os.path.isfile(os.path.dirname(os.path.abspath(__file__)) + path):
                return util_send_file(os.path.dirname(os.path.abspath(__file__)) + path)
            else:
                path = '/static' + path
                return util_send_file(os.path.dirname(os.path.abspath(__file__)) + path)


def create_app(env_name=None):
    """Application factory, used to create application
    """

    app = Flask(__name__, static_folder='/static', static_url_path='/')
    if env_name is None:
        env_name = os.environ.get('FLASK_ENV')
    env_name = env_name.lower()
    print(f'Configuration: {env_name}')
    app.config.from_object(config[env_name])

    initilize_services(app)
    register_blueprints(app)
    CORS(app)

    setup_static_file_loader(app)

    print('Flask Server Initialized')
    return app


def initilize_services(app):
    # logger = logging.getLogger(__name__)
    from h2e_api.main import models
    db.init_app(app)

    ma = Marshmallow(app)
    migrate = Migrate(app, db, compare_type=True)
    CORS(app, max_age=3600)  # NOTE: max_age is capped at 600 for Chrome


def register_blueprints(app):
    """register all blueprints for application
    """
    app.register_blueprint(front_end_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(common_bp, url_prefix=api_prefix)
    app.register_blueprint(users_bp, url_prefix=api_prefix)
    app.register_blueprint(auth_bp, url_prefix=api_prefix)
    app.register_blueprint(applications_bp, url_prefix=api_prefix)
    app.register_blueprint(mailing_bp, url_prefix=api_prefix)
    app.register_blueprint(session_bp, url_prefix=api_prefix)
    app.register_blueprint(bookings_bp, url_prefix=api_prefix)
    app.register_blueprint(preferences_bp, url_prefix=api_prefix)
    app.register_blueprint(tutors_bp, url_prefix=api_prefix)

