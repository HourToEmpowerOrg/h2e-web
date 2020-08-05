import React from 'react';
import LoginForm from '../components/sections/LoginForm';
import TempLoginForm from '../components/sections/TempLoginForm';

class Login extends React.Component {
  render() {
    return (
      <TempLoginForm className="illustration-section-01" />
      // <LoginForm className="illustration-section-01" />
    );
  }
}

export default Login;