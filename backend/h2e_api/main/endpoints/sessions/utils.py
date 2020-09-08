from h2e_api.factory import db

from h2e_api.main.models.Session import Session
from h2e_api.main.models.SessionUser import SessionUser

from h2e_api.main.dispatch.events import NEW_SESSION
from h2e_api.main import h2e_dispatcher


def create_session(session_data):
    basic_info = {
        'meeting_link': 'https://us.zoom.com/example-link?pwd=1233456'
    }
    new_session = Session(
        title=session_data['title'],
        start_time=session_data['start_time'],
        end_time=session_data['end_time'],
        session_info=basic_info
    )

    new_session.duration = new_session.end_time - new_session.start_time

    db.session.add(new_session)
    db.session.flush()

    new_session__tutor = SessionUser(
        session_id=new_session.id,
        user_id=session_data['tutor']
    )

    new_session__student = SessionUser(
        session_id=new_session.id,
        user_id=session_data['student']
    )

    db.session.add(new_session__tutor)
    db.session.add(new_session__student)
    db.session.commit()

    return new_session


def get_all_sessions_by_filter(user_id, filters):
    date_from = filters.get('date_from')
    date_to = filters.get('date_to')

    query = Session.query\
        .join(SessionUser, SessionUser.session_id == Session.id) \
        .filter(SessionUser.user_id == user_id)

    if date_from:
        query = query.filter(Session.start_time >= date_from)

    if date_to:
        query = query.filter(Session.start_time <= date_to)

    query = query.order_by(Session.start_time.asc())

    sessions = query.all()
    return sessions


def get_session_info(session_id, user_id):
    # TODO: Make sure user id has access to this session
    session = Session.query.filter(Session.id == session_id).one_or_none()
    session_data = {
        'session': session
    }
    return session_data


