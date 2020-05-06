import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../Context/auth";
import AppContext from '../../Context/app-context';

export default function LogoutHandler() {
    const { setAuthTokens } = useAuth();
    const context = useContext(AppContext);

    useEffect(
        () => {
            setAuthTokens();
            Cookies.remove("session");
            context.setConnectMessenger(false);
        }
    );

    return <Redirect to='/' />;
};
