import React from 'react';
import classNames from 'classnames';
import PrefferencesSection from '../components/sections/PreferencesSection';
import SeessionHistorySection from '../components/sections/SessionHistorySection';

class Preferences extends React.Component {
  render() {

    const outerClasses = classNames(
      'section',
      'container'
    );

    return (
      <React.Fragment>
          <section 
            className={outerClasses}
            style={{paddingBottom: '12px'}}
          >
            <h3>Your Preferences</h3>
          </section>

          <PrefferencesSection></PrefferencesSection>
          <SeessionHistorySection></SeessionHistorySection>
            
      </React.Fragment>
    );
  }
}

export default Preferences;