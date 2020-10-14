from datetime import datetime, date, timedelta

from h2e_api.main.models import (
    ScheduleItem,
    User,
    Session,
)
from h2e_api.main.models.enums import SessionStatus
from h2e_api.main.endpoints.sessions.repositories.session_repository import SessionRepository


def get_all_bookings_by_filter(user_id, filters):

    start_time = filters.get('date_from').time()
    session_duration = filters.get('duration', 1)

    potential_schedule = ScheduleItem.query.filter(
        ScheduleItem.start_time >= start_time,
    )

    if filters.get('date_to'):
        end_time = filters.get('date_to').time()

        potential_schedule = potential_schedule.filter(
            ScheduleItem.end_time <= end_time,
        )

    if filters.get('subject') is not None:
        print('TODO: Join on tutor based on schedule...')

    potential_schedule = potential_schedule\
        .join(User, User.id == ScheduleItem.user_id)\
        .order_by(ScheduleItem.day, ScheduleItem.start_time)\
        .with_entities(ScheduleItem, User)\
        .all()

    final_bookings = []

    for schedule_item in potential_schedule:
        p = schedule_item.ScheduleItem
        u = schedule_item.User
        duration = (datetime.combine(date.today(), p.end_time) - datetime.combine(date.today(), p.start_time))\
            .total_seconds() // 60 // 60

        for i in range(int(duration / session_duration)):
            session = {
                'start_time': datetime.combine(filters.get('date_from'), p.start_time) + timedelta(hours=i),
                'end_time': datetime.combine(filters.get('date_from'), p.start_time) + timedelta(hours=i + session_duration),
                'tutor_name': u.display_name,
                'tutor_id': u.id
            }
            final_bookings.append(session)

        p.start_time = datetime.combine((filters.get('date_from')), p.start_time)

    return final_bookings


def create_booking_request(user_id, booking_data):
    booking_data = {
        **booking_data,
        'tutor': booking_data['tutor_id'],
        'status': SessionStatus.PENDING,
        'student': user_id
    }
    new_session = SessionRepository.create(booking_data)
    return new_session


def respond_to_booking(session_id, validated_data):
    session = SessionRepository.update_by_id(
        session_id,
        fields_for_update=['session_status'],
        session_status=validated_data['response'],
        commit=True,
    )

    return session

