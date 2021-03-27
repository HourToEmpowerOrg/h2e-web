import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ScheduleItem from '../elements/ScheduleItem.js'
import axios from "axios";
import Button from '../elements/Button';
import Loading  from '../elements/Loading';

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
  const [loading, setLoading] = useState(true);
  const [showScheduleBlock, setShowScheduleBlock] = useState(false);

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
      setLoading(false);
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

  const showAddScheduleBlock = () => {
    setShowScheduleBlock(true);
  }


  const renderScheduleModal = () => {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
          <div className="modal-card">
          <header class="modal-card-head" style={{marginBottom: 0, paddingBottom: 0}}>
              <p class="modal-card-title">Add a schedule block</p>
              <button class="delete" aria-label="close" style={{marginBottom: 16, paddingBottom: 0}} onClick={() => setShowScheduleBlock(false)}></button>
          </header>

            <section className="modal-card-body">
              <p>
                Select a Day of the week for this schedule block
              </p>

              <div className="select schedule-item-select">
                <select>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                </select>
              </div>
              
              <p>Select a start time</p>
              <div className="select schedule-item-select">
                <select>
                  <option>1:00 pm</option>
                  <option>2:00 pm</option>
                  <option>3:00 pm</option>
                  <option>4:00 pm</option>
                </select>
              </div>

              <p>Select an end time</p>
              <div className="select schedule-item-select">
                <select>
                  <option>1:00 pm</option>
                  <option>2:00 pm</option>
                  <option>3:00 pm</option>
                  <option>4:00 pm</option>
                </select>
              </div>

            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Submit</button>
            </footer>
          </div>
      </div>
    )
  }

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

          { showScheduleBlock && renderScheduleModal()}
          {loading && <Loading></Loading>}
          {
            scheduleItems.map((item) => {
              return (
                <ScheduleItem item={item}/>
              )
            })
          }

          <Button className="btn is-small" onClick={showAddScheduleBlock}>Add a Schedule Block</Button>
          
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