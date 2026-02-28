import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();
    const { user, setUser, handleRegister, loading } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        await handleRegister(username, email, password);
        navigate('/')
    };

    if (loading) {
        return (
            <main>
                <h1>Loading....</h1>
            </main>
        );
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
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
                        placeholder="Enter Username"
                    />
                    <input
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                    />
                    <input
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                    />
                    <button className="button primary-button">Submit</button>
                </form>
                <p>
                    Already Have An Account{" "}
                    <Link to={"/login"}>Login Here.</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
