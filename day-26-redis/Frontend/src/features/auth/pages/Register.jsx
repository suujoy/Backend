import React from "react";
import FormGroup from "../components/FormGroup";
import "../style/register.scss";
import { Link } from "react-router";

const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
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
                        label="Username"
                        placeholder="Enter Your Username"
                    />
                    <FormGroup label="Email" placeholder="Enter Your email" />
                    <FormGroup
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
