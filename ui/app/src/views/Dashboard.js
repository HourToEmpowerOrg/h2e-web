import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import ScheduleSection from '../components/sections/ScheduleSection';
import PrefferencesSection from '../components/sections/PreferencesSection';
import SeessionHistorySection from '../components/sections/SessionHistorySection';

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
            <ScheduleSection></ScheduleSection>
            <PrefferencesSection></PrefferencesSection>
            <SeessionHistorySection></SeessionHistorySection>
      </React.Fragment>
    );
  }
}

export default Dashboard;