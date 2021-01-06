import React from 'react';
import ScheduleSection from '../components/sections/ScheduleSection';
import SeessionHistorySection from '../components/sections/SessionHistorySection';

class StudentDashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
            <ScheduleSection showPending={false} userType={'student'}></ScheduleSection>
            <SeessionHistorySection></SeessionHistorySection>
      </React.Fragment>
    );
  }
}

export default StudentDashboard;