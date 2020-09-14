import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchUserDetails, SESSION_ID, SESSION_TOKEN } from './store/users'
import Splash from './pages/splash'
import Navbar from './components/Navbar'
import RecipeCard from './components/RecipeCard';

const sessionId = localStorage.getItem(SESSION_ID)
const sessionToken = localStorage.getItem(SESSION_TOKEN)

const testRecipe = {
    title: 'Beef Bourguignon',
    category: 'Breakfast',
    image_url: 'https://images-gmi-pmc.edge-generalmills.com/42fb4d81-8d92-40e2-9f0a-524edce5ca74.jpg',
    user: {
        name: 'Demo Testerson'
    }
}

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
                <RecipeCard recipe={testRecipe} />
            </Route>
            <Route path='/' exact>
                <Splash />
            </Route>
        </BrowserRouter>
    );
}

export default App;