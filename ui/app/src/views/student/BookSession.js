import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import Moment from 'react-moment';
import 'moment-timezone'
import axios from 'axios';

import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import {apiUrl} from '../../Api';

//TODO: This should be loaded from our api
import {subjectOptions} from '../../SubjectConstants';
import TutorHeader from '../../components/layout/TutorHeader';

const filterTutors = (tutorList, inputValue) => {
  if(!tutorList) return [];
  return tutorList.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadTutorOptions = (inputValue, callback) => {

  axios.get(`${apiUrl}/tutors`).then(response => {
    callback(filterTutors(response.data.items, inputValue))
  })
  
};

var moment = require('moment');

function BookSession (props) {
    const [dateValue, setDateValue] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState('math');

    const [booked, setBooked] = useState(false);
    const [inputValue, setInputValue] = useState();
    const [subjects, setSubjects] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState();

    const buildFilters = () => {
      var baseUrl = `${apiUrl}/bookings?date=${moment(dateValue).format()}&subject=${selectedSubject}`

      if (selectedTutor) {
        baseUrl = `${baseUrl}&tutor=${selectedTutor.id}`
      }

      return baseUrl

    }


    const getBookings = () => {
      setLoading(true);
      setShowInfo(false);
      const getSessionsUrl = buildFilters()
      axios.get(getSessionsUrl).then(response => {
        setLoading(false);
        setBookings(response.data.bookings);
      }).catch(err => {
        console.error(err);
      })
    }

    const requestBooking = (booking) => {
      axios.post(`${apiUrl}/bookings/request`, booking)
        .then( (response) => {
          setBooked(true);
        })
        .catch((err) => {
          console.error(err);
        })
    }

    const onSubjectChange = (value) => {
      const subjs = value.map(function(i) {
          return i.value
        })
      setSubjects(subjs);
    }

    const onTutorChange = (value) => {
      setSelectedTutor(value)
    }

    const renderBookedModal = () => {
      return (
        <div className="modal is-active">
          <div className="modal-background"></div>
            <div className="modal-card">
              <section className="modal-card-body">
                Your Request for this session has been sent! You'll see this session on your dashboard once the Tutor has confirmed.
              </section>
              <footer class="modal-card-foot">
                <Link to="/student/dashboard">
                  <button class="button is-success">Dashboard</button>
                </Link>
              </footer>
            </div>
        </div>
      )
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

    const handleInputChange = (newValue) => {
      const inputValue = newValue.replace(/\W/g, '');
      setInputValue(inputValue);
    };

    return (
      <section
        {...props}
        className={outerClasses}
        style={{paddingBottom: '12px'}}
      >
        <div className="container">

            {booked && renderBookedModal()}
            
            <h4 className="page-header"> Book a Session </h4>

            <div className="entry-item">
              <div>
                Choose Date: 
              </div>

              <DatePicker selected={dateValue} onChange={date => setDateValue(date)} />

              {/* <button className="button is-small button-sm" onClick={() => setShowPicker(!showPicker)}>
                <strong style={{marginLeft: '4px'}}>
                  <Moment format="ddd, MMM, D z" local>
                    {dateValue}
                  </Moment>
                </strong>
              </button> */}
            </div>
            <div className="entry-item">
              Choose Subject: 
              <Select 
                isMulti
                name="subjects"
                options={subjectOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={onSubjectChange}
                placeholder="Please select subject(s)"
              />
            </div>

            <div className="entry-item">
              Optional: Choose a specific tutor
              <AsyncSelect
                placeholder="Search for a tutor.."
                cacheOptions
                defaultOptions
                loadOptions={loadTutorOptions}
                onInputChange={handleInputChange}
                onChange={onTutorChange}
                defaultValue={''}
              />
            </div>

            <button style={{marginLeft: '16px'}} className="button is-small is-link button-sm" onClick={ () => getBookings()}>Search</button>

            <div>
              <h4>Sessions</h4>
              {
                showInfo && (
                  <p>Select a Date and Subject, then click Search to see potential sessions to book here</p>
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
                      <p style={{marginTop: '2px', marginBottom: '2px'}}>{booking.tutor_name}</p>
                      <span className="form-hint">This tutor has a rating of <strong>5.0</strong></span>
                      <p style={{marginTop: '2px', marginBottom: '2px'}}> <span className="subject-tag">Math</span></p>
                      <a onClick={()=> requestBooking(booking)}>Book this session</a>
                  </div>
                  )
                })
              }
              {
                !loading && bookings.length == 0 && (
                  <p>It does not look like there are any available sessions for that day. Please try another.</p>
                )
              }
            </div>

        </div>
      </section>
    );
  
}

export default BookSession;