import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Timeline from '../elements/Timeline';
import TimelineItem from '../elements/TimelineItem';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class Roadmap extends React.Component {

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
      'roadmap section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'roadmap-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const sectionHeader = {
      title: 'How it Works',
      paragraph: 'Creating a community where students can get free tutoring sessions from real-life professionals.'
    };

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container section" id="how-it-works-section">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <Timeline>
              <TimelineItem title="School Partnership">
                We partner <strong>directly</strong> with schools to pair virtual volunteer tutors with students. Teachers can provide guidance and feedback for sessions
              </TimelineItem>
              <TimelineItem title="1:1 Scheduling">
                Schedule virtual sessions that fit both the tutor and students’ schedules, regardless of location
              </TimelineItem>
              <TimelineItem title="Secure Scheduling and Meetings">
                Students receive safe, accessible, and personalized support
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </section>
    );
  }
}

Roadmap.propTypes = propTypes;
Roadmap.defaultProps = defaultProps;

export default Roadmap;