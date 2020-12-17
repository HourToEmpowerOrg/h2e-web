import React from 'react';
import SignupForm from '../components/sections/SignupForm';
import ReactGA from 'react-ga';

class SignupTutor extends React.Component {
  render() {
    ReactGA.pageview('SignupTutor');
    return (
        <SignupForm className="illustration-section-01" userType="tutor"/>
    );
  }
}

export default SignupTutor;