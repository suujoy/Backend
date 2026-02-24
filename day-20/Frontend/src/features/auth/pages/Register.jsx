import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handelSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form
                    onSubmit={(event) => {
                        handelSubmit(event);
                    }}
                    className="form"
                >
                    <input
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        value={username}
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                    />
                    <input
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                        type="email"
                        name="email"
                        placeholder="Enter your Enail"
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
                    <button className="submit">Register</button>
                </form>

                <p>
                    Already have an account{" "}
                    <Link className="tougleAuthForm" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
