import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SectionProps } from '../../utils/SectionProps';
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone'

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

function SessionItem({item}) {


    return (
      <Link to={`/session/${item.id}`} style={{textDecoration: 'none'}}>
        <div className="session-item" key={item.id}>
            <div className="session-item-title">{item.title}</div>
            <span className="seession-item-body">
            <Moment format="ddd, MMM, D - h:mm A z" local>
                {item.start_time}
            </Moment>   
            </span>
            <br/>
            <a>{item.session_info.join_url}</a>
        </div>
        </Link>
    )

}

function ScheduleSection(props){

    const [sessions, setSessions] = useState([])


    useEffect(() => {
        async function fetchData() {
          // You can await here
          const result = await axios(
            '/api/v1/sessions',
          );
          // ...
          setSessions(result.data.sessions);
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state

  
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

    const innerClasses = classNames(
      'section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    return (
      <section
        {...props}
        className={outerClasses}
        style={{paddingBottom: '12px'}}
      >
        <div className="container">
          <div>
            <h4 className="dashboard-header">
                Upcoming Sessions
            </h4>
            <div>
                {sessions.map(item => (
                    <SessionItem item={item}></SessionItem>
                ))}
            </div>
            <div className="ml-12">
                <div className="form-hint">Click a session to view its details</div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default ScheduleSection;