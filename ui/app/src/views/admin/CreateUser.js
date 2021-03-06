import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import classNames from 'classnames';
import { toast } from "react-toastify";
import Input from '../../components/elements/Input';
import Button from '../../components/elements/Button';
import Checkbox from '../../components/elements/Checkbox';
import axios from "axios";
import { apiUrl } from '../../Api';

function CreateUser(props) {

    const [error, setError] = useState(null);

    
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['h2e']);

    const [inputs, setInputs] = useState({
        userName: '',
        email: '',
    })

    const { email, userName } = inputs;

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function submit() {

        const userData = {
            email: email,
            name: userName,
            behalf: 'ADMIN',
            password: 'temp-pass',
            user_type: 'TUTOR'
        }

        axios.post(`${apiUrl}/signup`, userData)
            .then(res => {
                if(res.status !== 200) {
                    setError(res.data);
                    toast.error('Error creating new user :/')
                } else {
                    //tODO: Show success
                    toast("User Created")
                    setInputs({userName: '', email: ''});
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

    const sectionHeader = {
        title: 'Create a new user',
    };

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <h3>Create a new user</h3>
                    <p>This will create a new <strong>tutor</strong> user with a temporary password of <strong>temp-pass</strong> that the user will be asked to enter upon attempting to log in.</p>
                    <p>The user will change his/her password after logging in for the first time.</p>
                    <div className="tiles-wrap">
                        <div className="tiles-item">
                            <div className="tiles-item-inner">
                                <form>
                                    <fieldset>
                                        <div className="mb-12">
                                            <Input
                                                type="text"
                                                label="Name"
                                                name="userName"
                                                placeholder="Full Name"
                                                onChange={handleChange}
                                                required />
                                        </div>
                                        <div className="mb-12">
                                            <Input
                                                type="email"
                                                label="Email"
                                                name="email"
                                                placeholder="Email"
                                                onChange={handleChange}
                                                required />
                                        </div>
                                        {
                                            error && (
                                                <p className="text-color-error">{error}</p>
                                            )
                                        }
                                        <div className="mt-24 mb-32">
                                            <Button color="primary" disabled={!email} wide onClick={submit}>Create User</Button>
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

export default CreateUser;