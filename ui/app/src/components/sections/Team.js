import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

class Team extends React.Component {

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      pushLeft,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'team section center-content',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'team-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap',
      pushLeft && 'push-left'
    );

    const tutorSectionHeader = {
      title: 'Our Tutors',
      paragraph: 'All of our tutors are volunteers who we recruit, train, and certify.',
      paragraph2: 'Meet our Tutors. All of our tutors are volunteers who we recruit, train, and certify.'
    };

    const teamSectionHeader = {
      title: 'Our Team'
    }

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            {/* TUTOR SECTION */}
            <SectionHeader data={tutorSectionHeader} className="center-content reveal-from-bottom" />
            {/* <div className={tilesClasses}>

              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap">
                <div className="tiles-item-inner">
                  <div className="team-item-header">
                    <div className="team-item-image mb-24">
                      <Image
                        src={require('./../../assets/images/team-member-04.jpg')}
                        alt="Team member 01"
                        width={180}
                        height={180} />
                    </div>
                  </div>
                  <div className="team-item-content">
                    <h5 className="team-item-name mt-0 mb-4">
                      Tutor Name
                    </h5>
                    <div className="team-item-role text-xs fw-600 mb-8">
                      Subject
                    </div>
                    <div className="team-item-link text-xs fw-600 mb-8">
                      LinkedIn Profile Link
                    </div>
                    <p className="m-0 text-sm">
                      Brief info / introduction
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap">
                <div className="tiles-item-inner">
                  <div className="team-item-header">
                    <div className="team-item-image mb-24">
                      <Image
                        src={require('./../../assets/images/team-member-02.jpg')}
                        alt="Team member 01"
                        width={180}
                        height={180} />
                    </div>
                  </div>
                  <div className="team-item-content">
                    <h5 className="team-item-name mt-0 mb-4">
                      Tutor Name
                    </h5>
                    <div className="team-item-role text-xs fw-600 mb-8">
                      Math
                    </div>
                    <div className="team-item-link text-xs fw-600 mb-8">
                      LinkedIn Profile Link
                    </div>
                    <p className="m-0 text-sm">
                      Brief info / introduction
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            {/* TEAM SECTION */}
            <SectionHeader data={teamSectionHeader} className="center-content reveal-from-bottom" />
            <div className={tilesClasses}>

            <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap">
                <div className="tiles-item-inner">
                  <div className="team-item-header">
                    <div className="team-item-image mb-24">
                      {/* <Image
                        src={require('./../../assets/images/team-member-chacko.jpg')}
                        alt="Team member 01"
                        width={180}
                        height={180} /> */}
                    </div>
                  </div>
                  <div className="team-item-content">
                    <h5 className="team-item-name mt-0 mb-4">
                      Rachael Chacko
                    </h5>
                    <div className="team-item-role text-xs fw-600 mb-8">
                      President, CEO
                    </div>
                    <div className="team-item-link text-xs fw-600 mb-8">
                      <a href="https://www.linkedin.com/in/rachael-chacko-ab556a101/">LinkedIn Profile</a>
                    </div>
                    <p className="m-0 text-sm">
                      Princeton 2017
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom" data-reveal-container=".tiles-wrap">
                <div className="tiles-item-inner">
                  <div className="team-item-header">
                    <div className="team-item-image mb-24">
                      {/* <Image
                        src={require('./../../assets/images/team-member-chacko.jpg')}
                        alt="Team member 01"
                        width={180}
                        height={180} /> */}
                    </div>
                  </div>
                  <div className="team-item-content">
                    <h5 className="team-item-name mt-0 mb-4">
                      William Bertrand
                    </h5>
                    <div className="team-item-role text-xs fw-600 mb-8">
                      CTO
                    </div>
                    <div className="team-item-link text-xs fw-600 mb-8">
                      <a href="https://www.linkedin.com/in/williambertrand/">LinkedIn Profile</a>
                    </div>
                    <p className="m-0 text-sm">
                      Princeton 2017
                    </p>
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

Team.propTypes = propTypes;
Team.defaultProps = defaultProps;

export default Team;