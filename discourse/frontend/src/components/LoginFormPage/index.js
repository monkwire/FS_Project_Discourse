import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({credential, password}))
        .catch(async (res) => {
            setErrors([res.statusText]);
        });
    }

    return (
        <div id='loginBox'>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>

            <div class='inputGroup'>
                <label>Username or Email: </label>
                <input type='text' value={credential} onChange={(e) => setCredential(e.target.value)} required></input>
            </div>
            <div class='inputGroup'>
                <label>Password </label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            </div>
            <div class='inputGroup'>
                <button type='submit'>Log In</button>
            </div>
        </form>
        <div id='barcodeDiv'>

        </div>
        </div>
    )
}

export default LoginFormPage