import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children }) => (
  <React.Fragment>
    <Header className="invert-color" navPosition="right" />
    <main className="site-content">
      {children}
    </main>
    <Footer />
  </React.Fragment>
);

export default LayoutDefault;  