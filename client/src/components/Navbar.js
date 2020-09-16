import { Sidebar } from 'grommet'
import { ImageStamp } from 'grommet-controls'
import React from 'react'
import { useSelector } from 'react-redux'
import { Icon } from 'react-icons-kit'
import {androidMenu} from 'react-icons-kit/ionicons/androidMenu'

export default () => {
    const { first_name, last_name, image_url, email } = useSelector(state => state.auth)

    return (
        <Sidebar background="brand" width="xxsmall"
            header={<ImageStamp src={image_url} size='small' />}
        >
        </Sidebar>
    )
}