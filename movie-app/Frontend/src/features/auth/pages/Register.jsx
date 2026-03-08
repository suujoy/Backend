import React, { useRef, useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import "../styles/register.scss";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate()

    const { handleRegister } = useAuth();

    const profileImageRef = useRef(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const profileImage = profileImageRef.current.files[0];

        const formData = new FormData();

        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio);
        formData.append("profileImage", profileImage);

        await handleRegister(formData);
        navigate('/')
    };

    return (
        <main className="register-page">
            <div className="register-card">
                <h1>Register</h1>

                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}
                >
                    <FormGroup
                        label="username"
                        placeholder="Enter your username"
                        type="text"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />

                    <FormGroup
                        label="email"
                        placeholder="Enter your email"
                        type="email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                    />

                    <FormGroup
                        label="password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />

                    <FormGroup
                        label="bio"
                        placeholder="Enter your bio"
                        type="text"
                        onChange={(event) => {
                            setBio(event.target.value);
                        }}
                        value={bio}
                    />

                    <div className="form-group profile-image-group">
                        <label htmlFor="profileImage" className="profileImage">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            ref={profileImageRef}
                        />
                    </div>

                    <button className="button" type="submit">
                        Register
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
