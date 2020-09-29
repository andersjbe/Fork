import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Form, EmailInputField, PasswordInputField, TextInputField } from 'grommet-controls'
import { Text, Anchor, Button, Box } from "grommet";

import { signUp, SESSION_ID } from '../store/users'

export default props => {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitSignUp = async e => {
        await dispatch(signUp(firstName, lastName, email, password, props.setAuthErrors))
        if (localStorage.getItem(SESSION_ID)) {
            window.location = '/dashboard'
        }
    }

    return (
        <div>
            <Text>Been here before? <Anchor onClick={props.toggleView}>Click me to log in</Anchor></Text>
            <Form onSubmit={submitSignUp}>
                <TextInputField
                    name='firstName'
                    label='First Name'
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />

                <TextInputField
                    name='lastName'
                    label='Last Name'
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />

                <EmailInputField
                    name='email'
                    label='Email Address'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <PasswordInputField
                    name='password'
                    label='Password'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <Box direction='row' justify='around'>
                    <Button primary label='Sign Up' type='submit' />
                </Box>

            </Form>
        </div>
    )
}