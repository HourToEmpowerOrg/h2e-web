import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import SectionHeader from '../sections/partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';
import axios from "axios";
import {apiUrl} from '../../Api';
import moment from 'moment';

function TutorSignupTable(props) {

  let history = useHistory();

  const [tutors, setTutors] = useState([]);
  const [newTutors, setNewTutors] = useState([]);
  const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
          const result = await axios(
            '/api/v1/applications/tutor',
          );
          
          setTutors(result.data.items);

          const newFiltered = result.data.items.filter(t => ((new Date()).getTime() - (new Date(t.created)).getTime() ) / (1000 * 3600 * 24) < 7)
          setNewTutors(newFiltered);

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

  const sectionHeader = {
    title: 'Tutor Signups',
  };

  const renderTutorTable = () => {
      return (
        <table className="table">
            <thead>
            <tr>
                <th></th>
                <th>Signup Date</th>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
                {
                    tutors.map((t) => {
                        const d = ((new Date()).getTime() - (new Date(t.created)).getTime() ) / (1000 * 3600 * 24)
                        return (
                            <tr>
                                <td>
                                    {d <= 7 && (<span className='tag is-primary'>New</span>)}
                                </td>
                                <td>
                                    {moment(t.created).calendar()}
                                </td>
                                <td>
                                    {t.email}
                                </td>
                                <td>
                                    {t.name}
                                </td>
                                <td>
                                    <span className='tag is-light'>Pending</span>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      )
  }

  return (
    <section
      {...props}
    >  
        <div>
            <h4 style={{marginBottom: 0}} className="dashboard-header">Tutor Signups</h4>
            <p style={{margin: 0}}>New this Week: {newTutors.length}</p>
            <p style={{marginTop: 0, marginBottom: 8}}>Total: {tutors.length}</p>
            {(tutors.length >0 && renderTutorTable())}
        </div>
    </section>
  );
}

export default TutorSignupTable;