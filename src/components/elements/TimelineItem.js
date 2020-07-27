import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

const defaultProps = {
  children: null,
  title: ''
}

const TimelineItem = ({
  className,
  children,
  title,
  ...props
}) => {

  const classes = classNames(
    'timeline-item',
    className
  );

  return (
    <div
      {...props}
      className={classes}>
      <div className="timeline-item-inner">
        <div className="timeline-item-header text-color-low tt-u mb-4 reveal-fade">{title}</div>
        <div className="timeline-item-content fw-700 h4 m-0 reveal-from-side">
          {children}
        </div>
      </div>
    </div>
  );
}

TimelineItem.propTypes = propTypes;
TimelineItem.defaultProps = defaultProps;

export default TimelineItem;