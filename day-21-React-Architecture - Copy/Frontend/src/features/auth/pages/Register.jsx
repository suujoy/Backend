import React from "react";
import { Link } from "react-router";

const Register = () => {
    const handelSubmit = (event) => {
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
                >
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username"
                    />
                    <input type="email" name="email" id="email" placeholder="Enter Email" />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                    />

                    <button className="button primary-button">Register</button>
                </form>
                <p>
                    Already have an Account{" "}
                    <Link to={"/login"}>Login here.</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
