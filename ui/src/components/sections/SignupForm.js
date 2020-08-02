import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class SignupForm extends React.Component {


  studentSignupForm() {
    return (
      <div className="tiles-wrap">
          <div className="tiles-item">
            <div className="tiles-item-inner">
              <form>
                <fieldset>
                  <div className="mb-12">
                    <Input
                      label="Full name"
                      placeholder="Full name" 
                      labelHidden
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Email"
                      labelHidden
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      type="password"
                      label="Password"
                      placeholder="Password"
                      labelHidden
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      label="Class"
                      placeholder="Select Class" 
                      labelHidden
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      label="Select Teacher"
                      placeholder="Select Teacher" 
                      labelHidden
                      required />
                  </div>
                  <div className="mt-24 mb-32">
                    <Button color="primary" wide disabled>Sign up</Button>
                  </div>
                </fieldset>
              </form>
              <div className="signin-bottom has-top-divider">
                {/* <div className="pt-32 text-xs center-content text-color-low">
                  Already have an account? <Link to="/login/" className="func-link">Login</Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
    )
  }

  tutorSignupForm() {
    return (
      <div className="tiles-wrap">
          <div className="tiles-item">
            <div className="tiles-item-inner">
              <form>
                <fieldset>
                  <div className="mb-12">
                    <Input
                      label="Full name"
                      placeholder="Full name" 
                      labelHidden
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Email"
                      labelHidden
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      type="password"
                      label="Password"
                      placeholder="Password"
                      labelHidden
                      required />
                  </div>
                  <div className="mt-24 mb-32">
                    <Button color="primary" wide disabled>Sign up</Button>
                  </div>
                </fieldset>
              </form>
              <div className="signin-bottom has-top-divider">
                {/* <div className="pt-32 text-xs center-content text-color-low">
                  Already have an account? <Link to="/login/" className="func-link">Login</Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
    )
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
      userType,
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

    const sectionHeaders = {
      tutor: {
        title: 'Volunteer a small amount of your time to help students grow.', 
      },
      student: {
        title: 'Welcome! Talk to your teacher to find out if your school is currently using HourToEmpower!', 
      }
    };

    const currentSchools = [
      'Overland High School (Aurora, CO)'
    ]

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader tag="h3" data={sectionHeaders[userType]} className="center-content" />

            {userType === 'tutor' && (
              <div>
                <div className="center-content">
                  <p>Hour To Empower is still a work in progress, but if you are interested in becoming a Tutor, please send an email to
                    <a href="mailto:hrtoempower@gmail.com">hrtoempower@gmail.com</a>
                  </p>
                  {this.tutorSignupForm()}
                </div>
              </div>
            )}

            {userType === 'student' && (
              <div>
                <div className="center-content">
                <span style={{textAlign:'left'}}>Currently supported schools:</span>
                <ul style={{listStyle:'none'}}>
                  {currentSchools.map(item => {
                    return (
                    <li>{item}</li>
                    )
                  })}
                </ul>
                {this.studentSignupForm()}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    );
  }
}

SignupForm.propTypes = propTypes;
SignupForm.defaultProps = defaultProps;

export default SignupForm;