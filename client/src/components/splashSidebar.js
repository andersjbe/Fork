import React, { useState } from 'react'

import Login from './login'
import Signup from './signup'
import { Box, Card, Heading, Paragraph, Text } from 'grommet'

export default () => {
    const [currentView, setCurrentView] = useState('login')
    const [authErrors, setAuthErrors] = useState([])

    function toggleView(e) {
        // e.preventDefault()
        setAuthErrors([])
        if (currentView === 'login') {
            setCurrentView('signup')
        } else {
            setCurrentView('login')
        }
    }

    return (
        <Box background='brand' elevation='xxlarge' fill='vertical' width='medium' pad='small' style={{ position: 'relative', zIndex: 2 }}>
            <Heading textAlign='center' level={2}>Welcome to Fork</Heading>
            <Text margin='small'>Fork is a recipe sharing app that lets you discover and create recipes </Text>
            <Card background="background" pad='medium'>
                <Text margin='xsmall'>Please log in or sign up to continue</Text>
                {currentView === 'login' ?
                    <Login setAuthErrors={setAuthErrors} toggleView={toggleView} />
                    : <Signup setAuthErrors={setAuthErrors} toggleView={toggleView} />}
                {authErrors.length > 0 ?
                    (<Box background='#f0a1b2' margin='xsmall'>
                        <ul style={{ color: '#d9002f' }}>
                            {authErrors.map((err, i) => <li key={i}>{err}</li>)}
                        </ul>
                    </Box>)
                    : null}
            </Card>
        </Box>
    )
}