import { Link } from "react-router";
import FormGroup from "../components/FormGroup";
import "../style/login.scss";

const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
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
                    <FormGroup label="Email" placeholder="Enter Your email" />
                    <FormGroup
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
