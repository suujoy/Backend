import { Link, useNavigate } from "react-router";
import FormGroup from "../components/FormGroup";
import "../style/login.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const { handleLogin, loading } = useAuth();

    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleLogin({ email, password });
        navigate('/')
    };

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login Page</h1>

                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}
                >
                    <FormGroup
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        label="Email"
                        placeholder="Enter Your email"
                    />
                    <FormGroup
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        label="Password"
                        placeholder="Enter Your Password"
                    />
                    <button className="button">Submit</button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register here.</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
