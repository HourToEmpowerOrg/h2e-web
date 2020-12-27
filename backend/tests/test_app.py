import unittest
from flask import current_app
from h2e_api.factory import create_app


class BasicTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push() # WHAT IS THIS?


    def tearDown(self) -> None:
        self.app_context.pop() #AND THIS?

    def test_app_exists(self):
        self.assertFalse(current_app is None)

    def test_app_is_testing(self):
        self.assertTrue(current_app.config['TESTING'])
