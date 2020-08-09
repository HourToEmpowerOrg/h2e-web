import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    URL_PREFIX = ''

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL')


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'data-test.sqlite')


class ProductionConfig(Config):
    """
        Configure as env variables
        IF running locally, add to your .env file
    """
    USERNAME = os.environ.get('USERNAME')
    PASSWORD = os.environ.get('DB_PWD')
    DB_NAME = os.environ.get('DB_NAME')
    ENDPOINT = os.environ.get('ENDPOINT')
    SQLALCHEMY_DATABASE_URI = f"postgresql://{USERNAME}:{PASSWORD}@{ENDPOINT}/{DB_NAME}"
    DATABASE_URL = SQLALCHEMY_DATABASE_URI


class DeploymentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEPLOY_DB_URL') or 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


config = {
    'Development': DevelopmentConfig,
    'Testing': TestingConfig,
    'Production': ProductionConfig,
    'Default': DevelopmentConfig,
    'Deploy': DeploymentConfig
}
