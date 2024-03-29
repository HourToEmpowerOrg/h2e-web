import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import 'moment-timezone'

function SessionOverviewSection(props){  
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      hasBgColor,
      invertColor,
      session
    } = props;

    const outerClasses = classNames(
      'section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    return (
      <section
        {...props}
        className={outerClasses}
        style={{paddingBottom: '12px'}}
      >
        <div className="container">
          <div>
            <h4 className="page-header">
                Session With {session.participant_name}
            </h4>

            <div className="session-item-title">{session.title}</div>
            <span className="seession-item-body">
            <Moment format="ddd, MMM, D - h:mm A z" local>
                {session.start_time}
            </Moment>   
            </span>
            
          </div>
        </div>
      </section>
    );
}

export default SessionOverviewSection;