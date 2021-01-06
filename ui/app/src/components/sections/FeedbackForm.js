import React, { useState } from 'react';
import classNames from 'classnames';
import Select from 'react-select'
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import axios from "axios";
import {apiUrl} from '../../Api';
import { feedbackOptions } from '../../Constants';

function FeedbackForm(props) {

  const [feedbackText, setFeedbackText] = useState('')
  const [type, setType] = useState()
  const [submitted, setSubmitted] = useState(false)

  const submitFeedback = (e) => {
    e.preventDefault();
    const feedbackData = {feedback_type: type, message: feedbackText}

    axios.post(`${apiUrl}/feedback`, feedbackData)
            .then(function (response) {
              if (response.status === 200) {
                setSubmitted(true);
              }
            })
            .catch(function (error) {
                console.log(error);
            });
  }

  const onTypeChange = (value) => {
        setType(value.value);
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
    'section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const sectionHeader = {
    title: 'Hour to Empower',
    paragraph: 'Need help? Have general feedback for using the application? You\'ve come to the right place.'
  };

  const renderFormSubmit = () => {
      if(submitted) {
          return <div><h6>Thanks! Your feeedback has been submitted.</h6></div>
      }
      else {
          return (
                <div className="mt-24 mb-32 center-content">
                    <Button color="primary" disabled={!feedbackText || !type} onClick={submitFeedback}>Submit</Button>
                </div>
          )
      }
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader tag="h3" data={sectionHeader} className="center-content" />
          <div className="container" style={{maxWidth: 900}}>
                <form>
                  <fieldset>
                    <Select 
                        name="type"
                        options={feedbackOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={onTypeChange}
                        placeholder="What kind of feedback are you leaving?"
                    />
                    <div className="mb-12">
                      <Input
                        type="textarea"
                        rows={4}
                        label="Your Message"
                        placeholder="Enter message here"
                        onChange = {e => setFeedbackText(e.target.value)}
                        required />
                    </div>
                    {
                        renderFormSubmit()
                    }
                  </fieldset>
                </form>
                <div className="signin-bottom has-top-divider">
                </div>
              </div>
            </div>
      </div>
    </section>
  );
}

export default FeedbackForm;