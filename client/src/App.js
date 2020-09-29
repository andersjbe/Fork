import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserDetails, SESSION_ID, SESSION_TOKEN } from './store/users'
import Splash from './pages/splash'
import AuthRoute from './components/AuthRoute'
import ProtectedRoute from './components/ProtectedRoute'
import CreateRecipe from './pages/CreateRecipe'
import Dashboard from './pages/Dashboard'
import PageLayout from './pages/PageLayout'
import NotFound from './pages/NotFound'
import Browse from './pages/browse'
import UserPage from './pages/UserPage';

const sessionId = localStorage.getItem(SESSION_ID)
const sessionToken = localStorage.getItem(SESSION_TOKEN)


function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionId && sessionToken) {
            dispatch(fetchUserDetails(sessionToken, sessionId));
        }
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute
                    path='/browse'
                    component={() => <PageLayout page={Browse} />}
                    currentUserId={sessionId}
                />
                <ProtectedRoute
                    path='/user'
                    component={() => <PageLayout page={UserPage} />}
                    currentUserId={sessionId}
                />
                <ProtectedRoute
                    path='/create-recipe'
                    component={() => <PageLayout page={CreateRecipe} />}
                    currentUserId={sessionId}
                    exact
                />
                <ProtectedRoute
                    path='/dashboard'
                    component={() => <PageLayout page={Dashboard} />}
                    currentUserId={sessionId}
                    exact
                />
                <ProtectedRoute
                    path='/search'
                    component={() => <h1>Search</h1>}
                    currentUserId={sessionId}
                    exact
                />
                    <AuthRoute
                        path='/'
                        component={Splash}
                        currentUserId={sessionId}
                        exact
                    />
                <ProtectedRoute
                    path=''
                    component={() => <PageLayout page={NotFound} />}
                    currentUserId={sessionId}
                    exact
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;