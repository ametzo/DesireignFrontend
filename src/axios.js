import axios from "axios";
import { config } from "./constants";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const redirectToLogin = () => {
    history.push("/login");
};

const axiosBase = axios.create({
    baseURL: `${config.SERVER_URL}/api/v1/admin`,
    withCredentials: true,
});

const refreshAccessToken = async () => {
    try {
        console.log("redreshtoken called");
        const response = await axios.post(
            `${config.SERVER_URL}/api/v1/admin/auth/refreshToken`,
            {},
            { withCredentials: true }
        );

        const { jwtToken } = response.data;

        localStorage.setItem("jwtToken", jwtToken);

        return jwtToken;
    } catch (error) {
        console.log(error);
        console.error("Error refreshing token", error?.response);
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
        // throw error;
    }
};

axiosBase.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        console.log(
            error.response.status,
            "error.response.status",
            originalRequest,
            originalRequest._retry
        );
        if (error.response.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();

                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;

                return axiosBase(originalRequest);
            } catch (err) {
                redirectToLogin();

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosBase;
