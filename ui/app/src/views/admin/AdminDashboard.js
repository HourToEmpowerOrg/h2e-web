import React from 'react';
import MailingListInfo from '../../components/admin/MailingListInfo';
import TutorSignupTable from '../../components/admin/TutorSignupTable';

class AdminDashboard extends React.Component {

  render() {
    return (
      <React.Fragment>
        <section>
          <div className="container page">

            <h3>Admin dashboard</h3>

            <TutorSignupTable></TutorSignupTable>

            <MailingListInfo></MailingListInfo>

          </div>
        </section>
            
      </React.Fragment>
    );
  }
}

export default AdminDashboard;