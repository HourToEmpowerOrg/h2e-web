from datetime import datetime

from h2e_api.main.models.ScheduleItem import ScheduleItem


def get_all_bookings_by_filter(user_id, filters):

    #TODO: Build up available bookings based on available tutors
    today_i = datetime.today().weekday()

    potential_schedule = ScheduleItem.query.filter(

    )



