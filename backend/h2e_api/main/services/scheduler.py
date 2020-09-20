from .scheduling.zoom_scheduler import ZoomScheduler


def create_session_meeting(session_data):
    meeting = ZoomScheduler.create_meeting(session_data)
    return meeting
