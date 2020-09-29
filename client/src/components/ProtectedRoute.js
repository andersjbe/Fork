import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({ component: Component, currentUserId, path, exact })  {

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                currentUserId ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};
