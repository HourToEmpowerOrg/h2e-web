import React from 'react';
import { Link } from 'react-router-dom';
import MailingListInfo from '../../components/admin/MailingListInfo';
import TutorSignupTable from '../../components/admin/TutorSignupTable';

class AdminDashboard extends React.Component {

  render() {
    return (
      <React.Fragment>
        <section>
          <div className="container page">

            <h3>Admin dashboard</h3>

            <Link to="/h2e_07546_admin/create_user"><button>Create Tutor User</button></Link>

            <TutorSignupTable></TutorSignupTable>

            <MailingListInfo></MailingListInfo>

          </div>
        </section>
            
      </React.Fragment>
    );
  }
}

export default AdminDashboard;