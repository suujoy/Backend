import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    if (!loading && !user) {
        return navigate("/login");
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }
    return children;
};

export default Protected;
