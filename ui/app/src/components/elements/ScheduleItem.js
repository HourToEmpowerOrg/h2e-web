import ScheduleSection from "../sections/ScheduleSection"
import React, { useState, useEffect } from 'react';
import Button from '../elements/Button';
import Moment from 'react-moment';
import 'moment-timezone'

var moment = require('moment');

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
    var schedule_start = moment(item.start_time, 'HH:mm:ssZ').format();
    var schedule_end = moment(item.end_time, 'HH:mm:ssZ').format();

    return (
        <div className="session-item" key={item.id} style={{position:'relative'}}>
            <div className="session-item-title">{dayFrom(item.day)}'s {repeatFrom(item.repeat_type)}</div>
            <span className="seession-item-body">
            <Moment format="h:mm A z" local>
                {schedule_start}
            </Moment>
    {' '} to {' '}
            <Moment format="h:mm A z" local>
                {schedule_end}
            </Moment>
            </span>

            <div style={{float: 'right', position:'absolute', top:'4px', right: '8px'}}>
                <a class="button-link text-xs" href="/preferences">Edit</a>
            </div>
        </div>
    )
}

export default ScheduleItem;