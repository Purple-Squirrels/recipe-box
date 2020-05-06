import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../Context/auth";

export default function LogoutHandler() {
    const { setAuthTokens } = useAuth();

    useEffect(
        () => {
            setAuthTokens();
            Cookies.remove("session");
        }
    );

    return <Redirect to='/' />;
};
