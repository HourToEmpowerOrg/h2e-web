import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone'
import {apiUrl} from '../../Api';
import Loading from '../elements/Loading';

function SessionItem({item, onRespond, itemPath}) {

    const respondToRequest = (item, resp) => {
      axios.post(`${apiUrl}/bookings/respond/${item.id}`, {response: resp})
        .then(_ => {
            onRespond()
        }).catch(err => {
          console.error(err)
        })
    }

    const itemLink = itemPath ? `/${itemPath}/session/${item.id}` : `/session/${item.id}`

    if(item.session_status === 'ACCEPTED') {
      return (
        <Link to={itemLink} style={{textDecoration: 'none'}}>
          <div className="session-item" key={item.id}>
              <div className="session-item-title">{item.title}</div>
              <span className="seession-item-body">
              <Moment format="ddd, MMM D h:mm A z" local>
                  {item.start_time}
              </Moment> {' to '}
              <Moment format="h:mm A z" local>
                  {item.end_time}
              </Moment>
              </span>
              <br/>
              <a href={item.session_info.join_url}>
                {item.session_info.join_url && item.session_info.join_url.indexOf('teams') > 0 ? ('Scheduled Microsoft Teams Meeting') : ('Scheduled Zoom Meeting')}
              </a>
          </div>
          </Link>
      )
    }
    else if (item.session_status === 'PENDING') {
      return (
        <div className="session-item" key={item.id}>
              <div className="session-item-title">{item.title}</div>
              <span className="seession-item-body">
              <Moment format="ddd, MMM, D - h:mm A z" local>
                  {item.start_time}
              </Moment>   
              </span>
              <br/>
              <div className="buttons action-row">
                <button 
                  className="action button is-small is-success"
                  onClick={() => respondToRequest(item, 'ACCEPTED')}>
                    Accept This Session
                </button>
                <button 
                  className="action button is-small is-link is-light"
                  onClick={() => respondToRequest(item, 'DECLINED')}>
                    Decline
                </button>
              </div>
          </div>
      )
    }
    else {
      return null
    }
}

function ScheduleSection(props){

    const [sessions, setSessions] = useState([])
    const [pending, setPending] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
          const upcoming = await axios(
            '/api/v1/sessions?status=ACCEPTED',
          );
          const requested = await axios(
            '/api/v1/sessions?status=PENDING',
          );
          
          setSessions(upcoming.data.sessions);
          setPending(requested.data.sessions);
          setLoading(false);
        }
        fetchData();
      }, [loading]); // re-perform fetchData on loading change

    
    const onRespond = () => {
      setLoading(true);
    }
  
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      hasBgColor,
      invertColor,
      userType,
    } = props;

    const outerClasses = classNames(
      'section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );
  

    const renderPendingRequests = () => {
        return (
          <div className="container">
          <h4 className="dashboard-header">
                Requested Tutoring Sessions
          </h4>
          <div className="ml-12">
                <div className="form-hint">Please respond to these tutoring session requests to confrim with the student.</div>
          </div>

          {
            pending.map(item => (
              item.session_info && 
              <SessionItem item={item} onRespond={onRespond}></SessionItem>
            ))
          }

          </div>
        )
    }

    return (
      <section
        className={outerClasses}
        style={{paddingBottom: '12px'}}
      >
        { props.showPending && !!pending.length && renderPendingRequests() }
        <div className="container">
          <div>
            <h4 className="dashboard-header">
                Upcoming Sessions
            </h4>
            {loading && <Loading></Loading>}
            <div className="ml-12">
              <div className="form-hint">
                { !!sessions.length && ("Click a session to view its details") }
              </div>
              { sessions.length === 0 && (<div><p>You do not have any upcoming sessions. 
                {userType === 'student' && (
                  <Link to="/student/book-session">Book a session now</Link>
                )}
              </p></div>)}
            </div>
            <div>
                {sessions.map(item => (
                    <SessionItem item={item} itemPath={userType}></SessionItem>
                ))}
            </div>
          </div>
          { !props.showPending && pending.length > 0 && (
            <div className="form-hint">
              You have {pending.length} session{pending.length > 1 ? 's' : ''} waiting for Tutor confirmation.
            </div>
          ) }
        </div>
      </section>
    );
}

export default ScheduleSection;