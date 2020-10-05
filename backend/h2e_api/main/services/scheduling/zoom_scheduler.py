import requests
import json
from h2e_api.main.models.user import User
import os


# TODO: As we get more services to schedule with,
#  create an abstract class that this inherits from with  create / cancel meeting functions
class ZoomScheduler:
    zoom_api_url = 'https://api.zoom.us/'
    meeting_url = 'v2/users/{}/meetings'
    zoom_user_id = "6EtUWKDhT_6jKxjLdW_4rA"  # TODO: How should we handle this?

    # TODO: get from env...
    headers = {
        'authorization': f"Bearer {os.getenv('ZOOM_TOKEN')}",
        'content-type': "application/json"
    }

    @classmethod
    def _create_meeting_body(cls, session_data):
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

    @classmethod
    def create_meeting(cls, session_data):
        payload = cls._create_meeting_body(session_data)
        response = requests.post(
            cls.zoom_api_url + cls.meeting_url.replace('{}', cls.zoom_user_id),
            json=payload,
            headers=cls.headers
        )

        if response.status_code > 201:
            raise Exception(f"Zoom scheduling error: \n {str(response.content)} \n ---------------------")

        meeting_info = response.json()
        return meeting_info

