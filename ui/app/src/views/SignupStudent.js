import React from 'react';
import SignupForm from '../components/sections/SignupForm';

class SignupStudent extends React.Component {
  render() {
    return (
        <SignupForm className="illustration-section-01" userType="student"/>
    );
  }
}

export default SignupStudent;