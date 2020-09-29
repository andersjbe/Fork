import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Form, EmailInputField, PasswordInputField, validators } from 'grommet-controls'
import { Text, Anchor, Button, Box } from "grommet";
import { Redirect, useHistory } from 'react-router-dom'

import { logIn, SESSION_ID } from '../store/users'

export default function Login(props) {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async () => {
        await dispatch(logIn(email, password, props.setAuthErrors))
        if (localStorage.getItem(SESSION_ID)) {
            window.location = '/dashboard'
        }
    }

    const demoLogin = async () => {
        setEmail('fork@fork.io')
        setPassword('fork')
        await dispatch(logIn('fork@fork.io', 'fork'))
        if (localStorage.getItem(SESSION_ID)) {
            window.location = '/dashboard'
        }
    }


    return (
        <div>
            <Text>First time here? <Anchor onClick={props.toggleView}>Click me to sign up</Anchor></Text>

            <Form onSubmit={submitLogin}>
                <EmailInputField
                    name='email'
                    label='Email Address'
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                />

                <PasswordInputField
                    name='password'
                    label='Password'
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <Box direction='row' justify='around'>
                    <Button primary label='Log In' type='submit' />
                    <Button secondary label='Demo User' onClick={demoLogin} />
                </Box>
            </Form>
        </div>
    )
}

