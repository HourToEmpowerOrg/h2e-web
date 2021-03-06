import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';
import axios from "axios";
import {apiUrl} from '../../Api';

function LoginForm(props) {

  let history = useHistory();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState();
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['h2e']);


  const submitLogin = (e) => {
    e.preventDefault();;
    const loginData = {email: email, password: password}

    axios.post(`${apiUrl}/login`, loginData)
            .then(function (response) {
              if (response.status === 200) {

                // Store user info in local storage for reading non-sensitive info
                // DO NOT use this for storing session info
                if (response.data) { 
                  localStorage.setItem('h2eUserInfo',
                  JSON.stringify( {
                      'display': response.data.display_name, 
                      'timezone': response.data.timezone, 
                      'username': response.data.username,
                      'role': response.data.role,
                    })
                  );
                }

                if(response.data.role === 'STUDENT') {
                  axios.get(`${apiUrl}/config`).then(response => {
                    setCookie('config', response.data);
                    history.push("/student/dashboard");
                  }).catch(err => {
                    history.push("/student/dashboard");
                  })
                }
                else if (response.data.role === 'TUTOR') {
                  if (response.data.has_temp_pass) {
                    history.push("/user/password-update");  
                  }
                  else { 
                    history.push("/dashboard");
                  }
                } 
                else if (response.data.role === 'ADMIN') {
                  history.push("/h2e_07546_admin");
                }
              } else if (response.status === 401) {
                setError('Incorrect Username or Password');
              }
            })
            .catch(function (error) {
                console.log(error);
                setError('Incorrect Username or Password');
            });
  }


  const {
    className,
    topOuterDivider,
    bottomOuterDivider,      
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
  } = props;

  const outerClasses = classNames(
    'signin section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'signin-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const sectionHeader = {
    title: 'Hour to Empower',
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader tag="h3" data={sectionHeader} className="center-content" />
          <div className="tiles-wrap">
            <div className="tiles-item">
              <div className="tiles-item-inner">
                <form>
                  <fieldset>
                    <div className="mb-12">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="Email"
                        onChange = {e => setEmail(e.target.value)}
                        required />
                    </div>
                    <div className="mb-12">
                      <Input
                        type="password"
                        label="Password"
                        placeholder="Password"
                        onChange = {e => setPassword(e.target.value)}
                        required />
                    </div>
                    {
                      error && (
                        <p className="text-color-error">{error}</p>
                      )
                    }
                    <div className="mt-24 mb-32">
                      <Button color="primary" disabled={!password || !email} wide onClick={submitLogin}>Sign in</Button>
                    </div>
                    <div className="signin-footer mb-32">
                      <Checkbox>Remember me</Checkbox>
                      <Link to="/recover-password/" className="func-link text-xs">Forgot password?</Link>
                    </div>
                  </fieldset>
                </form>
                <div className="signin-bottom has-top-divider">
                  {/* <div className="pt-32 text-xs center-content text-color-low">
                    Don't you have an account? <Link to="/signup/" className="func-link">Sign up</Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;