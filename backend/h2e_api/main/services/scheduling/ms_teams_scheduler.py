from h2e_api.main.services.scheduling.base_scheduler import BaseScheduler
from h2e_api.main.models import (
    User,
    School
)
import os


class MSTeamsScheduler(BaseScheduler):
    api_url = 'https://graph.microsoft.com/v1.0'
    meeting_path = '/me/onlineMeetings'
    user_id = None

    @classmethod
    def _get_meeting_participants(cls, session_data):
        """
            Meeting organizer should be Student's Admin Teams User Id
            Participants should include Teams users for both Student and Tutor
        """
        organizer_id = User.query\
            .filter(
                User.id == session_data['student']
            ).join(
                School,
                School.id == User.school
            ).with_entities(School.teams_admin_id)\
            .one_or_none()

        if organizer_id is None:
            raise Exception(f'Teams admin not set up for student: {session_data["student"]}')

        participants_ids = User.query\
            .filter(
                User.id.in_([session_data['tutor'], session_data['student']])
            )\
            .with_entities(User.teams_user_id)\
            .all()

        return {
            "organizer": {
                "identity": {
                    "user": {
                        "id": organizer_id
                    }
                }
            },
            "attendees": participants_ids

        }



    @classmethod
    def create_payload(cls, session_data):
        payload = {
            "startDateTime": session_data['start_time'],
            "endDateTime": session_data['end_time'],
            "subject": session_data['title'],
            "particiipants": cls._get_meeting_pariticpants(session_data)
        }
        return payload

    @classmethod
    def create_headers(cls):
        headers = {
            'authorization': f"Bearer {os.getenv('MS_TEAMS_TOKEN')}",
            'content-type': "application/json"
        }
        return headers
