import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserDetails, SESSION_ID, SESSION_TOKEN } from './store/users'
import Splash from './pages/splash'
import AuthRoute from './components/AuthRoute'
import ProtectedRoute from './components/ProtectedRoute'
import CreateRecipe from './pages/CreateRecipe'
import Dashboard from './pages/Dashboard'

const sessionId = localStorage.getItem(SESSION_ID)
const sessionToken = localStorage.getItem(SESSION_TOKEN)


function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionId && sessionToken) {
            dispatch(fetchUserDetails(sessionToken, sessionId));
        }
    }, [])

    const currentUserId = useSelector(state => state.auth.id)

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute
                    path='/create-recipe'
                    component={CreateRecipe}
                    currentUserId={sessionId}
                    exact
                />
                <ProtectedRoute
                    path='/dashboard'
                    component={() => <Dashboard />}
                    currentUserId={sessionId}
                    exact
                />
                <ProtectedRoute
                    path='/search'
                    component={() => <h1>Search</h1>}
                    currentUserId={sessionId}
                    exact
                />
            </Switch>
            <AuthRoute
                path='/'
                component={Splash}
                currentUserId={sessionId}
                exact
            />
        </BrowserRouter>
    );
}

export default App;