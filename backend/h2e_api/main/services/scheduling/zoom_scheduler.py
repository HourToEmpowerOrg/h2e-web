from h2e_api.main.models.user import User
from h2e_api.main.services.scheduling.base_scheduler import BaseScheduler
import os


class ZoomScheduler(BaseScheduler):
    api_url = 'https://api.zoom.us/'
    meeting_path = 'v2/users/{}/meetings'
    user_id = "6EtUWKDhT_6jKxjLdW_4rA"  # TODO : Meed to remove this

    @classmethod
    def create_headers(cls):
        headers = {
            'authorization': f"Bearer {os.getenv('ZOOM_TOKEN')}",
            'content-type': "application/json"
        }
        return headers

    @classmethod
    def create_payload(cls, session_data):
        tutor_id = session_data['tutor']
        user = User.query.filter(User.id == tutor_id).one_or_none()

        payload = {
            "topic": "Hour to Empower",
            "type": 2,
            "start_time": str(session_data['start_time']),
            "duration": (session_data['end_time'] - session_data['start_time']).total_seconds() / 60,
            "timezone": user.timezone,
            "agenda": "Tutoring session set up by Hour to Empower",
            "settings": {
                "host_video": "true",
                "participant_video": "true",
                "registrants_email_notification": "true"
            }
        }

        return payload


