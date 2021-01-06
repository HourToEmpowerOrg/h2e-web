import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import 'moment-timezone'

function MeetingInfoSection(props){  
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

    if (!session.session_info) {
        return <div>'loading...'</div>
    }

    return (
      <section
        {...props}
        className={outerClasses}
        style={{paddingBottom: '12px'}}
      >
        <div className="container">
          <div>
            <h4 className="page-header">
                Join Meeeting
            </h4>
            
            <span className="seession-item-body">
                <div>Platform: Zoom</div>
                <Moment format="ddd MMM D, h:mm A z" local>
                    {session.start_time}
                </Moment>   
                <div className="session-item-link text-color-primary">
                    <a href={session.session_info.join_url} target={'_blank'}>{session.session_info.join_url}</a>
                </div>
            </span>
            
          </div>
        </div>
      </section>
    );
}

export default MeetingInfoSection;