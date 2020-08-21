from h2e_api.factory import db
from h2e_api.main.models.ScheduleItem import ScheduleItem


def create_schedule_item(schedule_data):
    new_item = ScheduleItem(
        user_id=schedule_data['tutor'],
        start_time=schedule_data['start_time'],
        end_time=schedule_data['end_time'],
        repeat_type=schedule_data['repeat'],
        day=schedule_data['day']
    )

    db.session.add(new_item)
    db.session.commit()

    return new_item


def get_all_schedule_items_by_filter(user_id, filters):
    query = ScheduleItem.query.filter(ScheduleItem.user_id == user_id)

    if filters.get('sort_key') == 'day':
        query = query.order_by(ScheduleItem.day.asc())

    return query.all()
