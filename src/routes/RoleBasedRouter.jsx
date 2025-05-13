import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const roleBasedRoutes = [
    { path: "user-roles", roleNo: 1001 },
    { path: "subUser", roleNo: 1002 },
    { path: "leads", roleNo: 1003 },
    { path: "customer", roleNo: 1004 },
    { path: "worker", roleNo: 1005 },
    { path: "service", roleNo: 1006 },
    { path: "support", roleNo: 1007 },
];

const RoleBasedRouteWrapper = ({ children, ...rest }) => {
    const { roles } = useSelector((state) => state.admin);
    const location = useLocation();

    const currentRoute = location.pathname.split("/")[1];

    const matchedRoute = roleBasedRoutes.find(
        (route) => route.path === currentRoute
    );
    console.log(matchedRoute, currentRoute, "matchedroute");

    const hasPermission = (roleNo) => {
        return roles?.some(
            (role) =>
                role?.stepNumber === roleNo &&
                role?.permissions.includes("view")
        );
    };

    if (matchedRoute && !hasPermission(matchedRoute.roleNo)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RoleBasedRouteWrapper;
