import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios from "axios";

function MailingListInfo(props) {

  const [memberCount, setMemberCount] = useState();
  const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
          const result = await axios(
            '/api/v1/mailing',
          );
          
          setMemberCount(result.data.count);
          setLoading(false);
        }
        fetchData();
      }, [loading]); // re-perform fetchData on loading change

  const {
    className,
    topOuterDivider,
    bottomOuterDivider,      
    hasBgColor,
    invertColor,
  } = props;

  const outerClasses = classNames(
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
    >
      <div className="section">
        
          <h4 className="dashboard-header">Mailing List</h4>
            <p>Members: {memberCount}</p>
      </div>
    </section>
  );
}

export default MailingListInfo;