import React from 'react';
import TutorHeader from '../components/layout/TutorHeader';

const LayoutTutor = ({ children }) => (
  <React.Fragment>
    <TutorHeader className="invert-color" navPosition="right" />
    <main className="site-content">
      {children}
    </main>
  </React.Fragment>
);

export default LayoutTutor;  