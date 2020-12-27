from h2e_api.main.services.scheduling.base_scheduler import BaseScheduler
from h2e_api.main.models import (
    User,
    School
)
import pytz
import os


class MSTeamsScheduler(BaseScheduler):
    api_url = 'https://graph.microsoft.com/v1.0'
    meeting_path = '/me/onlineMeetings'

    @classmethod
    def parse_response(cls, data):
        data['join_url'] = data['joinUrl']
        return data

    @classmethod
    def _get_meeting_participants(cls, session_data):
        """
            Meeting organizer should be Student's Admin Teams User Id
            Participants should include Teams users for both Student and Tutor
        """
        school = User.query\
            .filter(
                User.id == session_data['student']
            ).join(
                School,
                School.id == User.school
            ).with_entities(School)\
            .one_or_none()

        if not school or school.admin_id is None:
            raise Exception(f'Teams admin not set up for student: {session_data["student"]}')

        participants = User.query\
            .filter(
                User.id.in_([session_data['tutor'], session_data['student']])
            )\
            .with_entities(User.teams_user_id.label('participant_id'))\
            .all()

        return {
            "organizer": {
                "identity": {
                    "user": {
                        "id": school.admin_id
                    }
                }
            },
            "attendees": [
                {
                    "identity": {
                        "user": {
                            "id": p.participant_id
                        }
                    }
                } for p in participants
             ]
        }

    @classmethod
    def create_payload(cls, session_data):
        start_datetime = session_data['start_time'].astimezone(pytz.utc)
        end_datetime = session_data['start_time'].astimezone(pytz.utc)
        payload = {
            "startDateTime": start_datetime.strftime("%Y-%m-%dT%H:%M:%S.%fz"),
            "endDateTime": end_datetime.strftime("%Y-%m-%dT%H:%M:%S.%fz"),
            "subject": session_data['title'],
            "participants": cls._get_meeting_participants(session_data)
        }
        return payload

    @classmethod
    def create_headers(cls):
        headers = {
            'Authorization': f"Bearer {os.getenv('MS_TEAMS_TOKEN')}",
            'Content-Type': "application/json"
        }
        return headers
