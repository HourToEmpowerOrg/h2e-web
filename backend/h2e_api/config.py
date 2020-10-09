import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    URL_PREFIX = ''
    STATIC_PREFIX = ''

    USERNAME = os.environ.get('USERNAME', 'postgress')
    PASSWORD = os.environ.get('DB_PWD', '')
    DB_NAME = os.environ.get('DB_NAME', 'hrtoempoweer')
    ENDPOINT = os.environ.get('ENDPOINT', 'localhost:5432')
    SQLALCHEMY_DATABASE_URI = f"postgresql://{USERNAME}:{PASSWORD}@{ENDPOINT}/{DB_NAME}"

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = True


class TestingConfig(Config):
    DEBUG = True
    TESTING = True


class ProductionConfig(Config):
    """
        Configure as env variables
        IF running locally, add to your .env file
    """
    DEBUG = False
    TESTING = False


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig,
}
