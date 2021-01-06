import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class ParentSection extends React.Component {

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

    // eslint-disable-next-line
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
            <div>
                <div className="center-content">
                  <h3>Help your child get started with Hour to Empower</h3>                
                </div>
                <br/>
                <p>
                  Hour to Empower is still a work in progress. If you're interested in having your child receive 1 on 1 tutoring sessions, please
                  send an email to <a href="mailto:hrtoempower@gmail.com">hrtoempower@gmail.com</a>
                  <br/>
                  <br/>
                  In your email, please include:
                  <br/>
                  <br/>
                    <ul>  
                      <li>Child's current Grade in school</li>
                      <li>City, State</li>
                      <li>School Name</li>
                    </ul>
                  </p>
              </div>
          </div>
        </div>
      </section>
    );
  }
}

ParentSection.propTypes = propTypes;
ParentSection.defaultProps = defaultProps;

export default ParentSection;