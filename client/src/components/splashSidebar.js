import React, { useState } from 'react'

import Login from './login'
import Signup from './signup'
import { Box, Heading, Text } from 'grommet'

export default () => {
    const [currentView, setCurrentView] = useState('login')

    function toggleView(e) {
        // e.preventDefault()
        console.log(currentView)
        if(currentView === 'login') {
            setCurrentView('signup')
        } else {
            setCurrentView('login')
        }
    }

    return (
        <Box background='brand' fill='vertical'>
            <Heading level={4}>Welcome to Fork</Heading>
            <Text>Please log in or sign up to continue</Text>
            { currentView === 'login' ? <Login toggleView={toggleView} /> : <Signup toggleView={toggleView} /> }
        </Box>
    )
}