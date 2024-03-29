import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class TempLoginForm extends React.Component {

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
      title: 'Creating a community where students can get free tutoring sessions from real-life professionals.',
    };
    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader tag="h3" data={sectionHeader} className="center-content" />
            <div>
                <div className="center-content">
                  <p>Hour to Empower is still a work in progress.</p>

                <h4>For Students</h4>

                  <p>If you're a <span style={{fontWeight:'bold'}}>student</span>, speak with your teacher to find out if your school is planning on using Hour to Empower</p>

                  <h4>For Tutors</h4>
                  <p>If you're interested in becoming a <span style={{fontWeight:'bold'}}>tutor</span>, please take a look at our <Link to="/signup/tutor">Tutor Application</Link></p>


                  <h4>For Parents</h4>
                  <p>Help your child get started with Hour to Empower by sending an email to <a href="mailto:hrtoempower@gmail.com">hrtoempower@gmail.com</a> </p>


                  <h4>For Everyone</h4>

                  <p>Feel free to reach us any time by sending an email to: <a href="mailto:hrtoempower@gmail.com">hrtoempower@gmail.com</a> </p>
                </div>
              </div>
          </div>
        </div>
      </section>
    );
  }
}

TempLoginForm.propTypes = propTypes;
TempLoginForm.defaultProps = defaultProps;

export default TempLoginForm;