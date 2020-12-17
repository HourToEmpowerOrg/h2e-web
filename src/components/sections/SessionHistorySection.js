import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import axios from "axios";
import Moment from 'react-moment';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

function SeessionHistorySection(props) {
  

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const completed = await axios(
        '/api/v1/sessions?status=COMPLETED',
      );
      setSessions(completed.data.sessions);
      setLoading(false);
    }
    fetchData();
  }, [loading]); // re-perform fetchData on loading change

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
      className={outerClasses}
      style={{paddingTop: '0px', paddingBottom:'0px'}}
    >
      <div className="container">
        <div className={innerClasses}>
          <h4 className="dashboard-header">
              {'Session History & Lesson Recordings'}
          </h4>
          {
            sessions.length == 0 && (
              <p>You have not completed any tutoring sessions yet</p>
            ) 
          }
          {
            sessions.map(item => (
              item.session_info && 
              (
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
                  className="action button is-small is-link">
                    Request Session Recording
                </button>
              </div>
          </div>
              )
            ))
          }
        </div>
      </div>
    </section>
    );
}

SeessionHistorySection.propTypes = propTypes;
SeessionHistorySection.defaultProps = defaultProps;

export default SeessionHistorySection;