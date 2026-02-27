import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Register = () => {
    const { user, loading, handelRegister } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handelSubmit = async (event) => {
        event.preventDefault();

        await handelRegister(username, email, password);
        navigate('/')

        console.log("User Rejestered");
    };
    if(loading){
        return <main><h1>Loading......</h1></main>
    }

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
