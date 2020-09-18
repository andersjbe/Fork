import { Anchor, Avatar, Header, Menu, Nav, Box } from 'grommet'
import React from 'react'
import { useSelector } from 'react-redux'
import { AddCircle } from 'grommet-icons'

import { logOut} from '../store/users'

export default () => {
    const { auth } = useSelector(state => state)

    const { first_name, last_name, image_url, email } = useSelector(state => state.auth)

    return (
        <Header height='xxsmall' background='brand' >
            <Nav margin='small'>
                <Anchor
                    size='large'
                    alignSelf='start'
                    color='background'
                    href='/'
                    label="Fork"
                />
            </Nav>

            <Nav margin='small' direction='row'>
                <Anchor href='create-recipe' size='small' alignSelf='center' color='background' icon={<AddCircle />} />
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