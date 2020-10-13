import React from 'react';
import ScheduleSection from '../components/sections/ScheduleSection';
import PrefferencesSection from '../components/sections/PreferencesSection';
import SeessionHistorySection from '../components/sections/SessionHistorySection';

class StudentDashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
            <ScheduleSection></ScheduleSection>
            <SeessionHistorySection></SeessionHistorySection>
      </React.Fragment>
    );
  }
}

export default StudentDashboard;