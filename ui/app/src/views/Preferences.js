import React from 'react';
import classNames from 'classnames';
import ScheduleSection from '../components/sections/ScheduleSection';
import PrefferencesSection from '../components/sections/PreferencesSection';
import SeessionHistorySection from '../components/sections/SessionHistorySection';

class Preferences extends React.Component {
  render() {

    const outerClasses = classNames(
      'section',
    );

    return (
      <React.Fragment>
          <section 
            className={outerClasses}
            style={{paddingBottom: '12px'}}
          >
            <h4>Your Preferences</h4>
            <p>
              Hey there! We're still working on getting this page set up, in the mean time if you need to change your scheduling preferences please send an email to <strong>help@hourtoempower.org</strong>
            </p>
          </section>
            
      </React.Fragment>
    );
  }
}

export default Preferences;