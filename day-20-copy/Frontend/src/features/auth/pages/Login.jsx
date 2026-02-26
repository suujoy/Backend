import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const { handelLogin } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handelSubmit = async (event) => {
        event.preventDefault();

        await handelLogin(username, password).then((res) => {
            console.log(res);
        });
    };
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form
                    onSubmit={(event) => {
                        handelSubmit(event);
                    }}
                    className="form"
                >
                    <input
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                        type="text"
                        name="username"
                        placeholder="Enter your Username"
                    />
                    <input
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                    <button className="submit">Login</button>
                </form>
                <p>
                    Dont have an account{" "}
                    <Link className="tougleAuthForm" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
