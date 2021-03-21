from h2e_api.main.models import User, TutorPage
from h2e_api.main.models.enums import UserType, UserStatus
from h2e_api.utils import create_response
from h2e_api.factory import db


def get_all_tutors():
    tutors_query = User.query\
        .filter(
            User.user_type == UserType.TUTOR,
            User.user_status == UserStatus.ACTIVE,
        )

    tutors = tutors_query.all()
    return tutors


def get_tutor_page_data(page_id):
    result = TutorPage.query\
        .filter(
            TutorPage.page_id == page_id
        ).join(
            User, User.id == TutorPage.user
        )\
        .with_entities(User)\
        .one_or_none()

    if not result:
        return create_response('No page data found', 404)
    else:
        return {
            'name': result.display_name,
            'tutor_id': str(result.id)
        }


def create_tutor_page_for_user(user_id):
    existing = TutorPage.query.filter(TutorPage.user == user_id).one_or_none()

    if existing:
        return create_response('Page already created', 200)

    tutor = User.query.filter(User.id == user_id).one_or_none()
    tp = TutorPage(
        page_id=tutor.username,
        user=tutor.id
    )
    db.session.add(tp)
    db.session.commit()
    return {
        'name': tutor.display_name,
        'tutor_id': tp.User.id
    }
