import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function LoginProtectRouter({ children, ...rest }) {
    const { isLoggedIn } = useSelector((state) => state.admin);
    if (isLoggedIn) {
        return <Navigate replace to="/" />;
    }

    return children;
}

export default LoginProtectRouter;
