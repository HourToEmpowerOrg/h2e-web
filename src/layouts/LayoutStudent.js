import axios from 'axios';  
import React from 'react';

import StudentHeader from '../components/layout/StudentHeader';
import { useCookies } from 'react-cookie';

function LayoutTutor ({ children}) {

  const [cookies, setCookie, removeCookie] = useCookies(['h2e']);

  const config = cookies.config;

  return (
    <React.Fragment>
      <StudentHeader className="invert-color" config={config} navPosition="right" />
      <main className="site-content">
        {children}
      </main>
    </React.Fragment>
  )

}

export default LayoutTutor;  