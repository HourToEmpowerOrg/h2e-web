import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';
import axios from "axios";


const api_url = '/api/v1'

function LoginForm(props) {

  let history = useHistory();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = (e) => {
    e.preventDefault();;
    const loginData = {email: email, password: password}

    axios.post(`${api_url}/login`, loginData)
            .then(function (response) {
              if (response.status == 200){
                if(response.data.role == 'STUDENT'){
                  history.push("/student/dashboard");
                }
                else{
                  history.push("/dashboard");
                }
                
              }
            })
            .catch(function (error) {
                console.log(error);
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