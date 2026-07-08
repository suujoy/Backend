import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import ThemeToggle from '../../theme/components/ThemeToggle';
import { Link } from 'react-router';

const Login = () => {
    const { handleLogin, loading, error } = useAuth();

    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleLogin(formData);
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <div className="min-h-screen w-full bg-bg-main text-text-main flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300 overflow-hidden">
            {/* Theme Toggle Positioned Top Right */}
            <div className="absolute top-6 right-6 z-10">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md flex flex-col gap-8 relative z-0">
                {/* Brand Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
                        Welcome Back
                    </h1>
                    <p className="mt-2.5 text-sm text-text-main/50 font-medium">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="bg-input-bg border border-input-border rounded-3xl p-8 sm:p-10 shadow-sm transition-colors duration-300">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <Input
                            label="Email or Contact"
                            type="text"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            placeholder="Email or Contact"
                            id="loginIdentifier"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            id="loginPassword"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 py-3.5 px-6 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-md shadow-primary/10 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-6 text-center text-sm text-text-main/50 font-medium">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;