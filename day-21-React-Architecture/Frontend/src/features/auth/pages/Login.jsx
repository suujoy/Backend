import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const { user, loading, handelLogin } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handelSubmit = async (event) => {
        event.preventDefault();

        await handelLogin(username, password);

        navigate("/");

        console.log("user logged in");
    };

    if (loading) {
        return (
            <main>
                <h1>Loading......</h1>
            </main>
        );
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form
                    onSubmit={(event) => {
                        handelSubmit(event);
                    }}
                >
                    <input
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        value={username}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username"
                    />
                    <input
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                    />

                    <button className="button primary-button">Login</button>
                </form>
                <p>
                    Dont have an Account{" "}
                    <Link to={"/register"}>Create one.</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
