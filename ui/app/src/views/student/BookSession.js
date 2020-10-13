import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import classNames from 'classnames';
import Moment from 'react-moment';
import 'moment-timezone'
import axios from 'axios';

var moment = require('moment');

function BookSession (props) {
    const [dateValue, setDateValue] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('math');

    const [booked, setBooked] = useState(false);


    const getBookings = () => {
      setLoading(true);
      setShowInfo(false);
      axios.get(`/api/v1/bookings?date_from=${moment(dateValue).format()}&subject=${selectedSubject}`).then(response => {
        setLoading(false);
        setBookings(response.data.bookings);
      }).catch(err => {
        console.error(err);
      })
    }

    const requestBooking = (booking) => {
      axios.post(`/api/v1/bookings/request`, booking)
        .then( (response) => {
          setBooked(true); //TODO: Show booking success message
        })
        .catch((err) => {
          console.error(err);
        })
    }

    const {
      className,
      children,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
    } = props;

    const outerClasses = classNames(
      'section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    return (
      <section
        {...props}
        className={outerClasses}
        style={{paddingBottom: '12px'}}
      >
        <div className="container">
            
            <h4 className="page-header"> Book a Session </h4>

            <div className="entry-item">
              Choose Date: 
              <strong style={{marginLeft: '4px'}}>
                <Moment format="ddd, MMM, D z" local>
                  {dateValue}
                </Moment>
              </strong>
              
              <button className="button is-small button-sm" onClick={() => setShowPicker(!showPicker)}>Pick</button>
            </div>
            {
              !!showPicker && (
              <Calendar 
                onChange={setDateValue}
                value={dateValue}
              />
              )
            }
            <div className="entry-item">
              Choose Subject: 
              <select style={{marginLeft: '4px'}}>
                <option>Math</option>
                
                <option>College Application Prep</option>
              </select>
            </div>

            <button style={{marginLeft: '16px'}} className="button is-small is-link button-sm" onClick={ () => getBookings()}>Submit</button>

            <div>
              <h4>Sessions</h4>
              {
                !showInfo && (
                  <p>Select a Date and Subject, then click Submit to see potential sessions to book here</p>
                )
              }
              {
                bookings.map( (booking, index) => {
                  return (
                    <div className="session-item" key={index}>
                      
                      <Moment format="ddd, MMM, D - h:mm A z" local>
                        {booking.start_time}
                      </Moment>   to{' '}
                      <Moment format="h:mm A z" local>
                        {booking.end_time}
                      </Moment>  
                      <p>{booking.tutor_name}</p>
                      <p style={{marginTop: '2px', marginBottom: '2px'}}> <span className="subject-tag">Math</span></p>
                      <a onClick={()=> requestBooking(booking)}>Book this session</a>
                  </div>
                  )
                })
              }
            </div>

        </div>
      </section>
    );
  
}

export default BookSession;