import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setAdmin } from "../redux/slices/adminSlice";
import { useDispatch } from "react-redux";
import { PageLoader } from "../components";

function SessionPage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError("");

            const response = await axios.get(`/auth/session/${token}`);
            dispatch(setAdmin(response.data));
            navigate("/");
        } catch (err) {
            setError(
                err?.response?.data?.error || "Something went wrong, Try again"
            );
            setIsLoading(false);
            navigate("/login");
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);
    return <PageLoader />;
}

export default SessionPage;
