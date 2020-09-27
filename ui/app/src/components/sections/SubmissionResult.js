import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class SubmissionResult extends React.Component {

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      type,
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
      tutor: {
        title: 'Thank you for submitting your application to Hour to Empower!'
      },
      school: {
        title: 'Thank you for your interest in partnering with Hour to Empower!'
      }
    };



    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader tag="h3" data={sectionHeader[type]} className="center-content" />
            <div>
                <div className="center-content">

                  <p>Someone will get back to you within the next 24 hours.</p>

                  <p>If you have any other questions, please feel free to reach us any time by sending an email to: <a href="mailto:hrtoempower@gmail.com">hrtoempower@gmail.com</a> </p>
                </div>
              </div>
          </div>
        </div>
      </section>
    );
  }
}

SubmissionResult.propTypes = propTypes;
SubmissionResult.defaultProps = defaultProps;

export default SubmissionResult;