from h2e_api.main.services.email_service import send_email
from h2e_api.main.services.msft_teams import TeamsService

from h2e_api.main.dispatch.events import (
    TUTOR_SIGNUP,
    STUDENT_SIGNUP
)

admin_emails = ['w.bertrand@hey.com']


class Dispatcher:

    @classmethod
    def _send_email(cls, application):
        subject = 'New Tutor Application'
        message = f'<h4>Tutor Application submitted at {application.created_at}</h4>'
        message += f'<p>-- Info --</p>'
        message += f'<p>Name: {application.name}</p>'
        message += f'<p>Email: {application.email}</p>'
        message += f"<p>Subjects: {','.join(application.subjects)}</p>"

        for to_addr in admin_emails:
            send_email(subject, message, to_addr)

    @classmethod
    def _send_teams_message(cls, application):
        ts = TeamsService()
        ts.send_new_signup_message('tutor', application)

    # Get application info, create email, send to admins
    @classmethod
    def _handle_tutor_signup(cls, application):
        cls._send_teams_message(application)

    @classmethod
    def handle_event(cls, event, data):
        """
            Handle events
            TODO: Parse data for required fields based on event type
        """
        if event == TUTOR_SIGNUP:
            cls._handle_tutor_signup(data)
        elif event == STUDENT_SIGNUP:
            print('Have not set up student handler')
        else:
            print(f'Have not set up handler for event: {event}')

    @classmethod
    def emit(cls, event, data=None):
        cls.handle_event(event, data)


