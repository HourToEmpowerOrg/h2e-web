import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import Moment from 'react-moment';
import 'moment-timezone'
import axios from 'axios';

import DatePicker from 'react-datepicker';
import {apiUrl} from '../../Api';
import Button  from '../../components/elements/Button';

// Eventually This should be loaded from our api
import {subjectOptions} from '../../Constants';

const Loading = () => {
  return (
    <div></div>
  )
}

var moment = require('moment');

function PublicBookSession (props) {
    
    const [dateValue, setDateValue] = useState(new Date());
    const [pageData, setPageData] = useState({});
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(true);

    const [booked, setBooked] = useState(false);
    // eslint-disable-next-line
    const [inputValue, setInputValue] = useState();
    const [subjects, setSubjects] = useState([]);

    const buildFilters = () => {
      var baseUrl = `${apiUrl}/bookings?date=${moment(dateValue).format()}&subject=${subjects}`
      baseUrl = `${baseUrl}&tutor=${pageData.tutor.id}`

      if (subjects){
        //TODO: Pass subjects ?
      }

      return baseUrl

    }


    /**
     *  Load page data based on url of currernt public page
     * 
    */
   useEffect(() => {
    async function fetchPageData(id) {
      // You can await here
      const result = await axios(
        `/api/v1/tutors/pages/${id}`,
      );
      setPageData(result.data);
    }
    fetchPageData(props.match.params.id);
  }, [props.match.params.id]);


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

    const renderBookedModal = () => {
      return (
        <div className="modal is-active">
          <div className="modal-background"></div>
            <div className="modal-card">
              <section className="modal-card-body">
                Your Request for this session has been sent! You'll recieve an email for this session once the Tutor has confirmed.
              </section>
              <footer class="modal-card-foot">
                  <button class="button is-success">Done</button>
              </footer>
            </div>
        </div>
      )
    }

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
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

    if (!pageData.tutor || loading) {
        return <Loading></Loading>
    }

    return (
      <section
        {...props}
        className={outerClasses}
        style={{paddingBottom: '12px'}}
      >
        <div className="container">

            {booked && renderBookedModal()}
            
            <h2 className="page-header"> Book a Session with {pageData.tutor.name} </h2>

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
                      <Button onClick={()=> requestBooking(booking)}>Book this session</Button>
                  </div>
                  )
                })
              }
              {
                !loading && bookings.length === 0 && (
                  <p>It does not look like there are any available sessions for that day. Please try another.</p>
                )
              }
            </div>

        </div>
      </section>
    );
  
}

export default PublicBookSession;