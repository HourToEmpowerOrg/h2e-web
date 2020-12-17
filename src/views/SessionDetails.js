import React, { useState, useEffect } from 'react';
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone'
import SessionOverviewSection from '../components/sections/sessions/SessionOverviewSection';
import MeetingInfoSection from '../components/sections/sessions/MeetingInfoSection';
import SessionNotes from '../components/sections/sessions/SessionNotes';

function SessionDetailsPage(props) {

    const [session, setSession] = useState({})

    useEffect(() => {
        async function fetchData(id) {
          // You can await here
          const result = await axios(
            `/api/v1/sessions/${id}`,
          );
          // ...
          setSession(result.data.session);
        }
        fetchData(props.match.params.id);
      }, []); // Or [] if effect doesn't need props or state

    return (
        <React.Fragment>
                <SessionOverviewSection session={session}></SessionOverviewSection>
                <SessionNotes session={session}></SessionNotes>
                <MeetingInfoSection session={session}></MeetingInfoSection>
        </React.Fragment>
    );
    
}

export default SessionDetailsPage;