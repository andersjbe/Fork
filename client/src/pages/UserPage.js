import { Box, Grid, Card, CardBody, CardHeader, Heading, Button } from 'grommet'
import { Avatar, EmailInputField, Form, PasswordInputField, TextInputField } from 'grommet-controls'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { apiUrl } from '../config'
import { SESSION_ID } from '../store/users'

export default function UserPage() {
    const { auth } = useSelector(state => state)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(null)

    const submitForm = e => {
        // e.preventDefault()
        if ([firstName, lastName, email, password, image].every(el => !el)) {
            return
        }

        const updateUser = async () => {
            const formData = {
                firstName,
                lastName,
                email,
                password,
                file: image
            }

            const id = localStorage.getItem(SESSION_ID)
            const body = new FormData()
            Object.keys(formData).forEach(key => body.append(key, formData[key]))

            const res = await fetch(`${apiUrl}/users/${id}`, {
                method: 'POST',
                body
            })

            if (res.ok) {
                // fetchUserDetails(SESSION_TOKEN, SESSION_ID)
                window.location = '/user'
            } else {
                console.log(res)
            }

        }

        updateUser()
    }

    return (<>
        <Box margin='small'>
            <Avatar
                image={auth.image_url}
                title={`${auth.first_name} ${auth.last_name}`}
                subTitle={auth.email}
                size='large'
            />
        </Box>

        <Box alignSelf='center' margin='small'>

            <Link to={`/browse?user=${auth.id}`}>
                <Button primary alignSelf='center' label='My Recipes' />
            </Link>
        </Box>

        <Card alignContent='center' width='medium' height='large' background='#fff' pad='small'>
            <CardHeader align='center' justify='center' >
                <Heading level={3} textAlign='center'>Edit Profile</Heading>
            </CardHeader>

            <CardBody >
                <Form onSubmit={submitForm}>
                    <Grid gap='small' rows={['1fr']} columns={['1fr', '1fr']}>
                        <TextInputField label='First Name' name='firstName'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)} />

                        <TextInputField label='Last Name' name='lastName'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)} />
                    </Grid>

                    <EmailInputField label='email' value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <PasswordInputField label="Password" value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <label htmlFor='profilePic'>Profile Picture</label>
                    <input name='profilePic' type='file' onChange={e => setImage(e.target.files.item(0))} accept='image/*' />

                    <Button label='Submit' type='submit' margin='small' alignSelf='center' />
                </Form>
            </CardBody>
        </Card>
    </>)
}