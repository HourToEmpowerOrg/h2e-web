from datetime import datetime, date, timedelta

from h2e_api.main.models.ScheduleItem import ScheduleItem


def get_all_bookings_by_filter(user_id, filters):

    start_time = filters.get('date_from').time()

    session_duration = filters.get('duration', 1)

    potential_schedule = ScheduleItem.query.filter(
        ScheduleItem.start_time >= start_time,
    )

    print(f'Query for schedules >= {start_time}')


    if filters.get('date_to'):
        end_time = filters.get('date_to').time()

        potential_schedule = potential_schedule.filter(
            ScheduleItem.end_time <= end_time,
        )

    if filters.get('subject') is not None:
        print('TODO: Join on tutor based on schedule...')

    today_i = datetime.today().weekday()

    potential_schedule = potential_schedule\
        .order_by(ScheduleItem.day, ScheduleItem.start_time)\
        .all()

    print(f'Got schedule items: {len(potential_schedule)}')

    final_bookings = []

    for p in potential_schedule:
        duration = (datetime.combine(date.today(), p.end_time) - datetime.combine(date.today(), p.start_time))\
            .total_seconds() // 60 // 60

        for i in range(int(duration / session_duration)):
            session = {
                'start_time': datetime.combine(filters.get('date_from'), p.start_time) + timedelta(hours=i),
                'end_time': datetime.combine(filters.get('date_from'), p.start_time) + timedelta(hours=i + duration),
                'tutor_name': 'Session with Hour to Empower Tutor'
            }
            final_bookings.append(session)

        print(f'Duration: {duration}')

        p.start_time = datetime.combine((filters.get('date_from')), p.start_time)

    return final_bookings



