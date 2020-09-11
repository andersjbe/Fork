import React, { useState } from 'react'

import Login from './login'
import Signup from './signup'
import { Box, Card, Heading, Paragraph, Text } from 'grommet'

export default () => {
    const [currentView, setCurrentView] = useState('login')

    function toggleView(e) {
        // e.preventDefault()
        console.log(currentView)
        if (currentView === 'login') {
            setCurrentView('signup')
        } else {
            setCurrentView('login')
        }
    }

    return (
        <Box background='brand' elevation='xxlarge' fill='vertical' width='medium' pad='small' style={{ position: 'relative', zIndex: 2 }}>
            <Heading level={2}>Welcome to Fork</Heading>
            <Text margin='small'>Fork is a recipe sharing app that lets you discover and share recipes </Text>
            <Card background="background" pad='medium'>
                <Text>Please log in or sign up to continue</Text>
                {currentView === 'login' ? <Login toggleView={toggleView} /> : <Signup toggleView={toggleView} />}

            </Card>
        </Box>
    )
}