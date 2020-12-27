import React from 'react';
import AdminHeader from '../components/layout/AdminHeader';

const LayoutAdmin = ({ children }) => (
  <React.Fragment>
    <AdminHeader className="invert-color" navPosition="right" />
    <main className="site-content">
      {children}
    </main>
  </React.Fragment>
);

export default LayoutAdmin;  