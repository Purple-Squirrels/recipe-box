import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavBarComponent from './NavBarComponent/NavBarComponent';
import { useAuth } from "../Context/auth";


export default ({ component: Component, ...rest }) => {
    const { authTokens } = useAuth();

    return (
        <Route exact {...rest} render={(props) => (
            (authTokens) ? (
                <div>
                    <NavBarComponent />
                    <Component {...props}/>
                </div>
            ) : (
                <Redirect to='/' />
            )
        )}/>
    )
}


