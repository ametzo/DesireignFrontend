import { useSelector } from "react-redux";
const roleBasedRoutes = [
    { path: "user-roles", roleNo: 1001 },
    { path: "subUser", roleNo: 1002 },
    { path: "leads", roleNo: 1003 },
    { path: "customer", roleNo: 1004 },
    { path: "worker", roleNo: 1005 },
    { path: "service", roleNo: 1006 },
    { path: "support", roleNo: 1007 },
];

const usePermission = (permissionType) => {
    const { roles } = useSelector((state) => state.admin);
    const currentRoute = location.pathname.split("/")[1];

    const matchedRoute = roleBasedRoutes.find(
        (route) => route.path === currentRoute
    );

    console.log(matchedRoute?.roleNo, permissionType, roles);
    const hasPermission = roles?.some(
        (role) =>
            role?.stepNumber === matchedRoute?.roleNo &&
            role?.permissions.includes(permissionType)
    );

    return hasPermission;
};

export default usePermission;
