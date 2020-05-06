import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavBarComponent from './NavBarComponent/NavBarComponent';
import { useAuth } from "../Context/auth";
import { getSessionCookie } from '../Sessions';

export default ({ component: Component, ...rest }) => {
    const { authTokens } = useAuth();
    const [session, setSession] = useState(getSessionCookie());
    useEffect(
      () => {
        setSession(getSessionCookie());
      },
      [session.userName]
    );

    return (
        <Route exact {...rest} render={(props) => (
            (authTokens || session.authToken !== undefined) ? (
                <div>
                    <NavBarComponent />
                    <Component {...props}/>
                </div>
            ) : (
                <Redirect to='/' />
            )
        )}/>
    )
};