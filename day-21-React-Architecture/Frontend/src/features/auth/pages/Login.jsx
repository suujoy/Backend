import React from "react";
import '../styles/form.scss'

const Login = () => {
    const handelSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <main>
            <div className="form-container">
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
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                    />

                    <button className="button primary-button">Login</button>
                </form>
            </div>
        </main>
    );
};

export default Login;
