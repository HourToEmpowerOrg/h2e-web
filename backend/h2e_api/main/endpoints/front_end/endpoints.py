from flask import Blueprint, current_app, redirect, request
from flask import url_for

from flask_restful import Resource
from flask_restful import Api

from h2e_api.utils import is_dev

from h2e_api.main.endpoints.front_end.utils.config_utils import get_config

front_end_bp = Blueprint('front_end', __name__)
front_end = Api(front_end_bp)


class Home(Resource):
    def get(self):
        if is_dev():
            return redirect(url_for('front_end.home') + current_app.config['URL_PREFIX'] + 'static/index.html')
        else:
            return redirect(url_for('front_end.home', _external=True, _scheme='https') + current_app.config['URL_PREFIX'] + 'static/index.html')


class FavIcon(Resource):
    def get(self):
        if is_dev():
            return redirect(url_for('front_end.home') + current_app.config['URL_PREFIX'] + 'static/public/logo/favicon.ico')
        else:
            return redirect(url_for('front_end.home', _external=True, _scheme='https') + current_app.config['URL_PREFIX'] + 'static/public/logo/favicon.ico')


class IndexHtml(Resource):
    pass


class Config(Resource):
    def get(self, school_id):
        config = get_config(school_id)
        return config, 200


front_end.add_resource(Home, '/')
front_end.add_resource(FavIcon, '/favicon.ico')
front_end.add_resource(IndexHtml, '/static/index.html')
front_end.add_resource(Config, '/config/<string:school_id>')