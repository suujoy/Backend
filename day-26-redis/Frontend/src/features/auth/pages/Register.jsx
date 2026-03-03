import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import "../style/register.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();

    const { handleRegister, loading } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleRegister({ username, email, password });
        navigate("/");
    };

    return (
        <main className="register-page">
            <div className="form-container">
                <h1>Login Page</h1>

                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}
                >
                    <FormGroup
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        label="Username"
                        placeholder="Enter Your Username"
                    />
                    <FormGroup
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        label="Email"
                        placeholder="Enter Your email"
                    />
                    <FormGroup
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        label="Password"
                        placeholder="Enter Your Password"
                    />
                    <button className="button">Submit</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
