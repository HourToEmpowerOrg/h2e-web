from h2e_api.main.models import (
    Session,
    SessionUser,
    User,
)
from h2e_api.main.models.enums import SessionStatus
from h2e_api.main.models.BaseModel import db
from h2e_api.main.endpoints.common.base_repository import BaseRepository
from h2e_api.main.services.scheduler import create_session_meeting


class SessionRepository(BaseRepository):
    model_class = Session

    @classmethod
    def create(cls, session_data):
        meeting_info = create_session_meeting(session_data)

        tutor = User.query.filter(User.id == session_data['tutor']).one_or_none()

        if not tutor:
            raise Exception('That tutor could not be found....')

        new_session = Session(
            title=session_data.get('title', f'Tutoring Session With {tutor.display_name}'),
            start_time=session_data['start_time'],
            end_time=session_data['end_time'],
            session_status=session_data.get('status', SessionStatus.PENDING),
            session_info=meeting_info
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

    @classmethod
    def get_all_by_filter(cls, user_id, **kwargs):

        date_from = kwargs.get('date_from')
        date_to = kwargs.get('date_to')
        sort_by = kwargs.get('sort_by', 'start_time')
        status = kwargs.get('status')
        limit = kwargs.get('limit')

        query = cls.get_base_query() \
            .join(SessionUser, SessionUser.session_id == Session.id) \
            .filter(SessionUser.user_id == user_id)

        if date_from:
            query = query.filter(Session.start_time >= date_from)

        if date_to:
            query = query.filter(Session.start_time <= date_to)

        if status is not None:
            query = query.filter(Session.session_status == status)

        if sort_by == 'start_time':
            query = query.order_by(Session.start_time.asc())

        if limit:
            query = query.limit(limit)

        sessions = query.all()
        return sessions

