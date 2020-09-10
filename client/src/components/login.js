import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Form, EmailInputField, PasswordInputField, validators } from 'grommet-controls'
import { Text, Anchor, Button } from "grommet";

import { logIn } from '../store/users'

export default props => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = e => {
        dispatch(logIn(email, password))
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

                <Button primary label='Log In' type='submit' />
            </Form>
        </div>
    )

}