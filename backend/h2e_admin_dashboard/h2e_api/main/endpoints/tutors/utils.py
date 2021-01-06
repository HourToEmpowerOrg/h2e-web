from h2e_api.main.models import User
from h2e_api.main.models.enums import UserType, UserStatus


def get_all_tutors():
    tutors_query = User.query\
        .filter(
            User.user_type == UserType.TUTOR,
            User.user_status == UserStatus.ACTIVE,
        )

    tutors = tutors_query.all()
    return tutors
