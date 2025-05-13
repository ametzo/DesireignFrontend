import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminPrivateRoute({ children, ...rest }) {
    const { isLoggedIn } = useSelector((state) => state.admin);
    // const isLoggedIn = true;

    console.log(isLoggedIn, "isLogged");
    if (!isLoggedIn) {
        return <Navigate replace to="/login" />;
    }

    return children;
}

export default AdminPrivateRoute;
