import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import SubmissionResult from './SubmissionResult';
import Input from '../elements/Input';
import Button from '../elements/Button';
import axios from "axios";

const api_url = '/api/v1'

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class SignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      'name': null,
      'email': null,
      'phone': null,
    }

    this.tutorSignupForm = this.tutorSignupForm.bind(this);
    this.submitTutorSignup = this.submitTutorSignup.bind(this);
    this.submitSchoolSignup = this.submitSchoolSignup.bind(this);
  }


  submitTutorSignup = (e) => {
    e.preventDefault();;

    const signupData = this.state;
    
    //Build the subject list - TODO: A list of available subjects should eventually be loaded from the API

    var subjects = signupData.subjects.split(',')

    var res = subjects.map(element => {
      return {'id': element.trim()}
    });

    signupData['subjects'] = res
    
    const self = this;
    axios.post(`${api_url}/applications/tutor`, signupData)
            .then(function (response) {
              if (response.status == 200){
                self.setState({submitted: true, submitType: 'tutor'})
              }
            })
            .catch(function (error) {
                console.log(error);
            });

  }


  submitSchoolSignup = (e) => {
    e.preventDefault();;

    const signupData = this.state;

    const self = this;
    axios.post(`${api_url}/applications/school`, signupData)
            .then(function (response) {
              if (response.status == 200){
                self.setState({submitted: true, submitType: 'school'})
              }
            })
            .catch(function (error) {
                console.log(error);
            });
    
  }


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

    const fieldsValid = (!!this.state && this.state.name && this.state.email && this.state.phone && this.state.zip && this.state.subjects);

    return (
      <div className="container-sm">
          <form>
            <fieldset>
              <form>
                <fieldset>
                  <div className="mb-12">
                  <label class="form-label" for="form-name">Full Name</label>
                    <Input
                      id="full-name"
                      label="Full name"
                      placeholder="Full name" 
                      labelHidden
                      onChange = {e => this.setState({'name': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                  <label class="form-label" for="form-email">Email</label>
                    <Input
                      id="form-email"
                      type="email"
                      label="Email"
                      placeholder="Email"
                      labelHidden
                      onChange = {e => this.setState({'email': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                  <label class="form-label" for="form-phone">Phone</label>
                    <Input
                      id="form-phone"
                      type="tel"
                      label="Phone"
                      placeholder="Your Phone Number"
                      labelHidden
                      onChange = {e => this.setState({'phone': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                  <label className="form-label" for="form-zip">Your Home Zip Code</label>
                    <Input
                      id="form-zip"
                      type="text"
                      label="Zip"
                      placeholder="Your Zip Code"
                      labelHidden
                      onChange = {e => this.setState({'zip': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                  <label className="form-label" for="form-subjects">Tutoring Subjects</label>
                    <Input
                      id="form-subjects"
                      type="text"
                      label="Subjects"
                      placeholder="Comma separated subjects"
                      labelHidden
                      onChange = {e => this.setState({'subjects': e.target.value})}
                      required />
                    <div className="form-hint">Please enter any subjects you'd be interested in tutoring for, separated by a comma.</div>

                  </div>
                  
                  <div className="mt-24 mb-32">
                    <Button color="primary" wide disabled={!fieldsValid} onClick={this.submitTutorSignup}>Sign up</Button>
                  </div>
                </fieldset>
              </form>
              <div className="signin-bottom has-top-divider">
                {/* <div className="pt-32 text-xs center-content text-color-low">
                  Already have an account? <Link to="/login/" className="func-link">Login</Link>
                </div> */}
              </div>
            </fieldset>
          </form>
        </div>
    )
  }

  schoolSignupForm() {

    const fieldsValid = (!!this.state && this.state.name && this.state.email && this.state.city && this.state.state);
    return (
      <div className="container-sm">
          <div>
            <div>
              <form>
                <fieldset>
                  <div className="mb-12">
                    <Input
                      label="School Name"
                      placeholder="School Name" 
                      onChange = {e => this.setState({'name': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      type="email"
                      label="Contact Name"
                      placeholder="Contact Name"
                      onChange = {e => this.setState({'contact_name': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      type="email"
                      label="Contact Email"
                      placeholder="Contact Email"
                      onChange = {e => this.setState({'email': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      type="text"
                      label="Contact Phone"
                      placeholder="Contact Phone"
                      onChange = {e => this.setState({'phone': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      label="School City"
                      placeholder="School city" 
                      onChange = {e => this.setState({'city': e.target.value})}
                      required />
                  </div>
                  <div className="mb-12">
                    <Input
                      label="School State"
                      placeholder="School State" 
                      onChange = {e => this.setState({'state': e.target.value})}
                      required />
                  </div>                  
                  <div className="mt-24 mb-32">
                    <div className="form-hint">You'll hear back from us within 24 hours!</div>
                    <Button color="primary" wide disabled={!fieldsValid} onClick={this.submitSchoolSignup}>Submit</Button>
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

  renderSignupForm() {

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

    const innerClasses = classNames(
      'signin-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const sectionHeaders = {
      tutor: {
        title: 'Volunteer a small amount of time to fight educational inequity. An hour of your time is an immeasurable amount for a student in need', 
        paragraph: 'Thank you for your interest in volunteering for Hour to Empower. Please fill out the details below. You will receive an email confirmation as well as an application form to gauge interests and suitability. Please note, as part of the screening process there is a mandatory background check.'
      },
      student: {
        title: 'Welcome! Talk to your teacher to find out if your school is currently using Hour to Empower!', 
      },
      school: {
        title: 'Hour to Empower partners with schools to connect their students with high quality tutors across the country.', 
        paragraph: 'Please fill out th form below if you are an administrator at a school interested in providing free tutoring services for your students. We will then schedule a time to determine if Hour to Empower is a fit for your school!'
      }
    };

    return (
      <div className={innerClasses}>
            <SectionHeader tag="h3" data={sectionHeaders[userType]} className="center-content" />

            {userType === 'tutor' && (
              <div>
                <div className="center-content">
                  <p>
                    Hour to Empower is still being set up, but if you are interested in becoming a Tutor, please fill out the form below, and someone from Hour to Empower will reach out to you with next steps.
                  </p>
                </div>
                {this.tutorSignupForm()}
              </div>
            )}

            {userType === 'student' && (
              <div>
                <div className="center-content">
                  {this.studentSignupForm()}
                </div>
              </div>
            )}

            {userType === 'school' && (
              <div>
                <div>
                {this.schoolSignupForm()}
                </div>
              </div>
            )}

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

    const submitState = this.state.submitted;
    const submitType = this.state.submitType;

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">

          {
            !!submitState && (
              <SubmissionResult type={submitType}></SubmissionResult>
            )
          }
          {
            !submitState && (
              this.renderSignupForm()
            )
          }
        </div>
      </section>
    );
  }
}

SignupForm.propTypes = propTypes;
SignupForm.defaultProps = defaultProps;

export default SignupForm;