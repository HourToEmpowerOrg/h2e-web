import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';


import axios from "axios";

const api_url = process.env.REACT_APP_API_URL || '/api/v1'

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class LoginForm extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      email: null,
      password: null
    }
  }

  submitLogin = (e) => {
    e.preventDefault();;
    const loginData = {email: this.state.email, password: this.state.password}
    const self = this;
    axios.post(`${api_url}/login`, loginData)
            .then(function (response) {
              if (response.status == 200){
                console.log('Authenticated...')
                history.push("/dashboard");

              }
            })
            .catch(function (error) {
                console.log(error);
            });
  }

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

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
      title: 'HourToEmpower',
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
                          onChange = {e => this.setState({'email': e.target.value})}
                          required />
                      </div>
                      <div className="mb-12">
                        <Input
                          type="password"
                          label="Password"
                          placeholder="Password"
                          onChange = {e => this.setState({'password': e.target.value})}
                          required />
                      </div>
                      <div className="mt-24 mb-32">
                        <Button color="primary" disabled={!this.state.password || !this.state.email} wide onClick={this.submitLogin}>Sign in</Button>
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
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;