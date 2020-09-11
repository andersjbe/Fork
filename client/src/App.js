import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchUserDetails, SESSION_ID, SESSION_TOKEN } from './store/users'
import Splash from './pages/splash'
import Navbar from './components/Navbar'

const sessionId = localStorage.getItem(SESSION_ID)
const sessionToken = localStorage.getItem(SESSION_TOKEN)

function App() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (sessionId && sessionToken) {
            dispatch(fetchUserDetails(sessionToken, sessionId));
        }
    }, [])
    
    // const token = ''
    const {token} = useSelector(state => state.auth)
    console.log(token)

    return (
        <BrowserRouter>
            <Route path='/'>
                <Splash />
            </Route>
        </BrowserRouter>
    );
}

export default App;