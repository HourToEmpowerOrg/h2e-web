import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ScheduleItem from '../elements/ScheduleItem.js'
import axios from "axios";
import Button from '../elements/Button';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

// const bookingLink = 'hourtoempower.org/booking/test_tutor'

function  copyPublicLink() {
  // add to clipboard
}

function PrefferencesSection(props) {

  const [scheduleItems, setScheduleItems] = useState([]);
  const [isPublicLinkEnabled, setPublickLinkEnabled] = useState(false);
  const [publicLink, setPublicLink] = useState()

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const result = await axios(
        '/api/v1/preferences/schedule',
      );
      // ...
      setScheduleItems(result.data.items);
      const userName = (localStorage.getItem('h2eUserInfo') ? JSON.parse(localStorage.getItem('h2eUserInfo')).username : '')
      setPublicLink(`hourtoempower.org/booking/${userName}`);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  useEffect(() => {
    async function submitData() {
      // You can await here
      const result = await axios.post('/api/v1/tutors/me/public-page', {});
    }
    submitData();
  }, [isPublicLinkEnabled]);

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

  return (
    <section
      className={outerClasses}
      style={{paddingTop: '12px', paddingBottom:'0px'}}
    >
      <div className="container" style={{marginBottom: '8px'}}>
        <div>
          <h4 className="dashboard-header">
              Scheduling
          </h4>
          {
            scheduleItems.map((item) => {
              return (
                <ScheduleItem item={item}/>
              )
            })
          }

          <Button className="btn is-small">Add a Schedule Block</Button>
          
          <h4 className="dashboard-header">
              Public Booking Page
          </h4>
          <div>
            {
              isPublicLinkEnabled && (
                <div>
                  <h6>
                    
                    <a href={publicLink}>{publicLink}</a>
                    {/* <a className="button is-ghost" onClick={() => copyPublicLink()}>copy</a> */}
                  </h6>
                  <p className="subtext">Share this link to allow your students to book sessions on your calendar.</p>
                </div>
                
              )
            }
          <input id="switchRoundedInfo" 
            type="checkbox" 
            name="switchRoundedInfo" 
            className="switch is-rounded is-info" 
            checked={isPublicLinkEnabled}
            onChange={() => setPublickLinkEnabled(!isPublicLinkEnabled)}
            style={{margin: 10, width: 20, transform: "scale(1.5)"}}
          />
            <label htmlFor="switchExample">Enable your public booking page</label>
          </div>
        </div>
      </div>
    </section>
  );
  
}

PrefferencesSection.propTypes = propTypes;
PrefferencesSection.defaultProps = defaultProps;

export default PrefferencesSection;