import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios from "axios";
import 'moment-timezone'
import {apiUrl} from '../../../Api';


// Debounce Hook
function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
  
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
  
    return debouncedValue;
  }

function updateSessionNote(session_id, note) {
    return axios.post(`${apiUrl}/sessions/${session_id}/note`, {'text': note})
}

function SessionNotes(props){  

    // Handle the input text state
    const [noteText, setNoteText] = useState('');
    // eslint-disable-next-line 
    const [isUpdating, setIsUpdating] = useState(false); //Not sure what we want isupdating for

    const debouncedTextUpdate = useDebounce(noteText, 500);
    // Effect for API call 
    useEffect(
        () => {
            if (debouncedTextUpdate) {
                setIsUpdating(true);
                updateSessionNote(props.session.id, debouncedTextUpdate).then(results => {
                    setIsUpdating(false);
                });
            } 
        },
        [debouncedTextUpdate, props.session.id],  // Only call effect if debounced text update changes
    );


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

    if(session.note && noteText === '') {
        setNoteText(session.note)
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
                Session Notes
            </h4>
            
            <div className="mb-16">
                <label className="form-label" htmlFor="form-message">Type Below to add or edit notes for this tutoring session</label>
                <textarea id="form-message" className="form-input" placeholder="Type notes for your student here..." value={noteText} onChange={e => setNoteText(e.target.value)}></textarea>
            </div>
            
          </div>
        </div>
      </section>
    );
}

export default SessionNotes;