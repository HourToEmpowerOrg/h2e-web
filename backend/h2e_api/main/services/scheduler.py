from flask import g
from h2e_api.main.models import School
from h2e_api.main.models.enums import MeetingPlatform
from h2e_api.main.services.scheduling.zoom_scheduler import ZoomScheduler
from h2e_api.main.services.scheduling.ms_teams_scheduler import MSTeamsScheduler


def get_scheduler():

    school = School.query.filter(School.id == g.user.school).one_or_none()

    if not school or not school.meeting_platform:
        raise Exception(f'Please set meeting platform for school: {g.user.school}')

    if school.meeting_platform == MeetingPlatform.ZOOM:
        return ZoomScheduler
    elif school.meeting_platform == MeetingPlatform.TEAMS:
        return MSTeamsScheduler
    else:
        raise Exception(f'Cannot handle platform: {school.meeting_platform}')


def create_session_meeting(session_data):
    meeting = get_scheduler().send_create_meeting_request(session_data)
    return meeting
