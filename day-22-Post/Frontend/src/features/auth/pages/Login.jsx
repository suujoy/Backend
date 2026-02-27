import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../styles/form.scss";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const { user, setUser, loading, handleLogin } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleLogin(username, password);

        console.log("User Logged in");
    };

    if (loading) {
        return (
            <main>
                <h1>Loading.......</h1>
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
                    Don't have an accoutn{" "}
                    <Link to={"/register"}>Create one.</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
