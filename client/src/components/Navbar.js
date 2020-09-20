import { Anchor, Avatar, Header, Menu, Nav, Box, Form, TextInput } from 'grommet'
import React from 'react'
import { useSelector } from 'react-redux'
import { AddCircle, Github, Search } from 'grommet-icons'
import { Link, Redirect } from 'react-router-dom'

import { logOut } from '../store/users'

export default () => {
    const { auth } = useSelector(state => state)

    const { first_name, last_name, image_url, email } = useSelector(state => state.auth)

    return (
        <Header height='xxsmall' background='brand' style={{ position: 'sticky', top: '0' }} >
            <Nav margin='small' direction='row'>

                <Link
                    to='/'
                    style={{
                        alignSelf: 'center',
                        textDecoration: 'none',
                        color: '#fff8e1',
                        fontWeight: '700',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '24px'
                    }}
                >Fork</Link>
                    <Anchor
                        color='background'
                        icon={<Github />}
                        alignSelf='center'
                        href='https://github.com/andersjbe/Fork'
                        target='_blank'
                    />

            </Nav>

            <Box background='#fff' round='large'>
                <Form onSubmit={({value}) => window.location = `/browse?search=${value['search']}`}>
                    <TextInput name='search' plain size='small' icon={<Search />}  /> 
                </Form>
            </Box>

            <Nav margin='small' direction='row'>
                <Link to='/create-recipe' style={{alignSelf: 'center'}}>
                    <AddCircle color='background' />
                </Link>
                <Menu
                    label={<Box>
                        <Avatar src={auth.image_url} size='small' />
                    </Box>}
                    icon={false}
                    items={[
                        { label: 'Account' },
                        { label: 'Log Out', onClick: logOut }
                    ]}
                    dropAlign={{
                        top: 'top',
                        right: 'right'
                    }}
                />
            </Nav>
        </Header>
    )
}