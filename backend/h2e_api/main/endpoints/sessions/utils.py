from h2e_api.factory import db

from h2e_api.main.models.Session import Session
from h2e_api.main.models.enums import SessionStatus
from h2e_api.main.models.user import User
from h2e_api.main.models.SessionUser import SessionUser
from h2e_api.main.models.SessionNote import SessionNote
from h2e_api.main.dispatch.events import NEW_SESSION
from h2e_api.main import h2e_dispatcher
from h2e_api.main.endpoints.sessions.repositories.session_repository import SessionRepository
from flask import g


def create_session(session_data):
    # create meeting with zoom or other platform
    new_session = SessionRepository.create(session_data)
    return new_session


def get_all_sessions_by_filter(user_id, filters):
    sessions = SessionRepository.get_all_by_filter(
        user_id=user_id,
        **filters
    )
    return sessions


def get_session_info(session_id, user_id):
    # TODO: Make sure user id has access to this session
    result = Session.query.filter(Session.id == session_id)\
        .join(SessionNote, SessionNote.session_id == session_id)\
        .with_entities(
            Session,
            SessionNote
        )\
        .one_or_none()

    participants = SessionUser.query\
        .filter(SessionUser.session_id == session_id)\
        .join(User, User.id == SessionUser.user_id)\
        .with_entities(User)\
        .all()

    participant = [u for u in participants if u.id != user_id][0]

    session_data = {
        **result[0].to_dict(),
        'note': result[1].text if result[1] else None,
        'participant_name': participant.display_name,
        'participant_email': participant.email
    }
    return session_data


def update_session_note(session_id, note):
    session_note = SessionNote.query.filter(SessionNote.session_id == session_id).one_or_none()

    if session_note is None:
        session_note = SessionNote(
            session_id=session_id,
            author_id=g.user.id,
            text=note['text']
        )
    else:
        session_note.text = note['text']

    db.session.add(session_note)
    db.session.commit()
