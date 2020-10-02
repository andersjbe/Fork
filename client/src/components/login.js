import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Form, EmailInputField, PasswordInputField } from 'grommet-controls'
import { Text, Anchor, Button, Box } from "grommet";

import { logIn, SESSION_ID, setUser, SESSION_TOKEN } from '../store/users'
import { apiUrl } from '../config'
import { useHistory } from "react-router-dom";

export default function Login(props) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async () => {
        await dispatch(logIn(email, password, props.setAuthErrors))
        if (localStorage.getItem(SESSION_ID)) {
            window.location = '/dashboard'
        }
    }

    const demoLogin = () => {
        ( async () => {
            const body = new FormData()
            const demoData = { email: 'fork@fork.io', password: 'fork' }
            for(let k in demoData) {
                body.append(k, demoData[k])
            }
            const res = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                body
            })

            const { user, token } = await res.json()
            localStorage.setItem(SESSION_TOKEN, token)
            localStorage.setItem(SESSION_ID, user.id)
            dispatch(setUser(token, user))
            history.push('/dashboard')
        })()
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

