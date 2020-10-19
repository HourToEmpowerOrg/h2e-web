from .factory import create_app
from h2e_api.utils import util_send_file
import os


app = create_app()


@app.errorhandler(404)
def not_found(e):
    """
        This enables client side routing on the ui
        -> Whenever we receive a non-api route request like /student/dashboard we send the index.html
    """
    return util_send_file(os.path.dirname(os.path.abspath(__file__)) + '/static/index.html')
