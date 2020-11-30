import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SectionProps } from '../../utils/SectionProps';
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone'
import {apiUrl} from '../../Api';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

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

    if(item.session_status == 'ACCEPTED') {
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
              <a>
                {item.session_info.join_url && item.session_info.join_url.indexOf('teams') > 0 ? ('Scheduled Microsoft Teams Meeting') : ('Scheduled Zoom Meeting')}
              </a>
          </div>
          </Link>
      )
    }
    else if (item.session_status == 'PENDING') {
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
    const [loading, setLoading] = useState(false)

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
      children,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      userType,
      showPending,
      ...rest
    } = props;

    const outerClasses = classNames(
      'section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );
    
    const subtitle = classNames(
      'section-subtitle'
    )

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
            <div className="ml-12">
              <div className="form-hint">
                { !!sessions.length ? ("Click a session to view its details") : ("You do not have any upcoming sessions")

                }
              </div>
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