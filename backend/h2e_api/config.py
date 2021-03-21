import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    URL_PREFIX = ''
    STATIC_PREFIX = ''

    USERNAME = os.environ.get('USERNAME', '')
    PASSWORD = os.environ.get('DB_PWD', '')
    DB_NAME = os.environ.get('DB_NAME', 'hrtoempower')
    ENDPOINT = os.environ.get('ENDPOINT', 'localhost:5432')
    SQLALCHEMY_DATABASE_URI = f"postgresql://{USERNAME}:{PASSWORD}@{ENDPOINT}/{DB_NAME}"

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL')


class ProductionConfig(Config):
    """
        Configure as env variables
        IF running locally, add to your .env file
    """
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DB_URL', '')


class DeployConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DB_URL')

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'deploy': DeployConfig,
    'default': DevelopmentConfig,
}
