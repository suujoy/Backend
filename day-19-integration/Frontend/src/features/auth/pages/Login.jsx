import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handelSubmit = async (event) => {
        event.preventDefault();

        const { data } = await axios.post(
            "http://localhost:3000/api/auth/login",
            { username, password },
            { withCredentials: true },
        );

        console.log(data);
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
