import React from 'react';
import StudentHeader from '../components/layout/StudentHeader';

const LayoutTutor = ({ children }) => (
  <React.Fragment>
    <StudentHeader className="invert-color" navPosition="right" />
    <main className="site-content">
      {children}
    </main>
  </React.Fragment>
);

export default LayoutTutor;  