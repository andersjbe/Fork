import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Heading } from 'grommet'
import { useDispatch } from 'react-redux';

import { fetchUserDetails, SESSION_ID, SESSION_TOKEN } from './store/users'
import Splash from './components/splashSidebar'

const sessionId = localStorage.getItem(SESSION_ID)
const sessionToken = localStorage.getItem(SESSION_TOKEN)

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionId && sessionToken) {
            dispatch(fetchUserDetails(sessionToken, sessionId));
        }
    })

    return (
        <BrowserRouter>
            <h1>Hello WOrld</h1>
            <Splash />
        </BrowserRouter>
    );
}

export default App;