import React, { useState } from "react";
import "../styles/login.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";
import FormGroup from "../components/FormGroup";

const Login = () => {
    const { user, setUser, loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleLogin({ username, password });
        navigate("/");
    };


    return (
        <main className="login-page">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p className="subtitle">Login to continue</p>

                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}
                >
                    <FormGroup
                        label="username"
                        placeholder="Enter your username"
                        type="text"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />

                    <FormGroup
                        label="password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />

                    <button className="button" type="submit">
                        Login
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
