import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ScheduleItem from '../elements/ScheduleItem.js'
import axios from "axios";

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

function PrefferencesSection(props) {

  const [scheduleItems, setScheduleItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const result = await axios(
        '/api/v1/preferences/schedule',
      );
      // ...
      setScheduleItems(result.data.items);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

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
              Scheduling Preferences
          </h4>
          {
            scheduleItems.map((item) => {
              return (
                <ScheduleItem item={item}/>
              )
            })
          }
        </div>
      </div>
    </section>
  );
  
}

PrefferencesSection.propTypes = propTypes;
PrefferencesSection.defaultProps = defaultProps;

export default PrefferencesSection;