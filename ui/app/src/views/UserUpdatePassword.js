import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from "react-toastify";
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import axios from "axios";
import { apiUrl } from '../Api';

function UserUpdatePassword(props) {

    const history = useHistory();
    const [valid, setValid] = useState(false);
    const [error, setError] = useState();

    const [inputs, setInputs] = useState({
        pass1: '',
        pass2: '',
    })

    const { pass1, pass2 } = inputs;

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }))
    }

    //off by 1 call here...
    const isValid = () => {
        console.log('is valid? ' + pass1 + " :" + pass2);
        return (pass1 === pass2) && pass1.length >= 8
    }


    useEffect(() => {
        setValid(isValid())
    }, [pass1, pass2])

    

    function submit() {

        const updateData = {
            pass_update: pass1
        }

        axios.post(`${apiUrl}/update`, updateData)
            .then(res => {
                if(res.status !== 200) {
                    setError(res.data);
                    toast.error('Error :/')
                } else {
                    //tODO: Show success
                    toast("Password updated")
                    history.push('/dashboard');
                }
            })

    }

    const {
        className,
        topOuterDivider,
        bottomOuterDivider,
        topDivider,
        bottomDivider,
        hasBgColor,
        invertColor,
    } = props;

    const outerClasses = classNames(
        'signin section',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'signin-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <h3>Update your password</h3>
                    <p>Please update your temporary password to begin using Hour to Empower</p>
                    <div className="tiles-wrap">
                        <div className="tiles-item">
                            <div className="tiles-item-inner">
                                <form>
                                    <fieldset>
                                        <div className="mb-12">
                                            <Input
                                                type="password"
                                                label="Password"
                                                name="pass1"
                                                placeholder="Enter your new password"
                                                onChange={handleChange}
                                                required />
                                        </div>
                                        <div className="mb-12">
                                            <Input
                                                type="password"
                                                label="Confirm Password"
                                                name="pass2"
                                                placeholder="Please confirm your new password"
                                                onChange={handleChange}
                                                required />
                                        </div>
                                        {
                                            !valid && (
                                                <p className="text-color-error">Please make sure passwords match and are more than 8 characters long.</p>
                                            )
                                        }
                                        {
                                            error && (
                                                <p className="text-color-error">Error: {error}</p>
                                            )
                                        }
                                        <div className="mt-24 mb-32">
                                            <Button color="primary" disabled={!valid} wide onClick={submit}>Update</Button>
                                        </div>
                                    </fieldset>
                                </form>
                                <div className="signin-bottom has-top-divider">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserUpdatePassword;