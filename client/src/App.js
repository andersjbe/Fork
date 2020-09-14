import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchUserDetails, SESSION_ID, SESSION_TOKEN } from './store/users'
import Splash from './pages/splash'
import Navbar from './components/Navbar'
import RecipeCard from './components/RecipeCard';
import RecipeFeed from './components/RecipeFeed'

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
            <Route path='/card' exact>
                <RecipeFeed category='Beef' />
            </Route>
            <Route path='/' exact>
                <Splash />
            </Route>
        </BrowserRouter>
    );
}

export default App;