import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AuthRoute({ component: Component, currentUserId, path, exact }) {

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                currentUserId ? <Redirect to="/dashboard" /> : <Component {...props} />
            }
        />
    );
}

