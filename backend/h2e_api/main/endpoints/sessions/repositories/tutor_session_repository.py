from h2e_api.main.models import (
    Session,
    SessionUser,
    User,
)
from collections import defaultdict
from h2e_api.main.models.enums import UserType
from sqlalchemy import  Date, and_
from h2e_api.main.endpoints.common.base_repository import BaseRepository


class TutorSessionRepository(BaseRepository):

    @classmethod
    def get_sessions_for_tutors(cls, selected_datetime):

        sessions = Session.query \
            .filter(
                Session.start_time.cast(Date) == selected_datetime.date(),
                Session.session_status.isnot(None)
            ) \
            .join(SessionUser, SessionUser.session_id == Session.id) \
            .join(
                User,
                and_(
                    User.id == SessionUser.user_id,
                    User.user_type == UserType.TUTOR
                )
            ) \
            .with_entities(User.id.label('tutor'), Session)\
            .all()

        session_map = defaultdict(list)
        for s in sessions:
            session_map[s.tutor].append(s.Session)

        return session_map
