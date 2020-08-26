import ScheduleSection from "../sections/ScheduleSection"
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone'

function dayFrom(dayNum) {
    switch(dayNum) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}

function repeatFrom(repeat_type) {
    return repeat_type.charAt(0).toUpperCase() + repeat_type.toLowerCase().slice(1);
}

function ScheduleItem({item}) {

    return (
        <div className="session-item" key={item.id}>
            <div className="session-item-title">{dayFrom(item.day)}'s {repeatFrom(item.repeat_type)}</div>
            <span className="seession-item-body">
                {item.start_time} to {item.end_time}
            </span>
        </div>
    )
}

export default ScheduleItem;