import React from 'react';
import SignupForm from '../components/sections/SignupForm';

class SignupTutor extends React.Component {
  render() {
    return (
        <SignupForm className="illustration-section-01" userType="tutor"/>
    );
  }
}

export default SignupTutor;