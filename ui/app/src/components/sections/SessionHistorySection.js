import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

function SeessionHistorySection(props) {
  

  const [sessions, setSessions] = useState([]);

  const {
    className,
    children,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
  } = props;

  const outerClasses = classNames(
    'section',
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



  return (
    <section
      {...props}
      className={outerClasses}
      style={{paddingTop: '0px', paddingBottom:'0px'}}
    >
      <div className="container">
        <div className={innerClasses}>
          <h4 className="dashboard-header">
              {'Session History & Lesson Recordings'}
          </h4>
          {
            sessions.length == 0 && (
              <p>You have not completed any tutoring sessions yet</p>
            ) 
          }
        </div>
      </div>
    </section>
    );
}

SeessionHistorySection.propTypes = propTypes;
SeessionHistorySection.defaultProps = defaultProps;

export default SeessionHistorySection;