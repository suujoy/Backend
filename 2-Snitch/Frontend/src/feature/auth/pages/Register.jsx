import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import ThemeToggle from '../../theme/components/ThemeToggle';

const Register = () => {
    const { handleRegister, loading, error } = useAuth();
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contact: '',
        password: '',
        isSeller: false,
        isAdmin: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister(formData);
            setSuccess(true);
        } catch (err) {
            console.error("Registration error:", err);
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
                        Create Account
                    </h1>
                    <p className="mt-2.5 text-sm text-text-main/50 font-medium">
                        Fill in your details below to get started
                    </p>
                </div>

                <div className="bg-input-bg border border-input-border rounded-3xl p-8 sm:p-10 shadow-sm transition-colors duration-300">
                    {success ? (
                        <div className="flex flex-col items-center text-center py-6 gap-4 animate-fade-in">
                            <div className="w-12 h-12 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold">Registration Successful!</h2>
                            <p className="text-sm text-text-main/60">
                                Your account has been created successfully. Welcome aboard!
                            </p>
                        </div>
                    ) : (
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
                                label="Full Name"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                id="fullName"
                                required
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                id="email"
                                required
                            />

                            <Input
                                label="Contact Number"
                                type="tel"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Enter your contact number"
                                id="contact"
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                id="password"
                                required
                            />

                            {/* Checkboxes Row */}
                            <div className="flex flex-col gap-3 mt-1 sm:flex-row sm:justify-between">
                                <label className="flex items-center gap-3 cursor-pointer select-none group">
                                    <input
                                        type="checkbox"
                                        name="isSeller"
                                        checked={formData.isSeller}
                                        onChange={handleChange}
                                        className="appearance-none w-5 h-5 rounded-lg border border-input-border bg-input-bg checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer flex items-center justify-center relative after:content-[''] after:hidden checked:after:block after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:-translate-y-0.5"
                                    />
                                    <span className="text-xs font-semibold text-text-main/70 group-hover:text-text-main transition-colors duration-200">
                                        Register as Seller
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer select-none group">
                                    <input
                                        type="checkbox"
                                        name="isAdmin"
                                        checked={formData.isAdmin}
                                        onChange={handleChange}
                                        className="appearance-none w-5 h-5 rounded-lg border border-input-border bg-input-bg checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer flex items-center justify-center relative after:content-[''] after:hidden checked:after:block after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:-translate-y-0.5"
                                    />
                                    <span className="text-xs font-semibold text-text-main/70 group-hover:text-text-main transition-colors duration-200">
                                        Register as Admin
                                    </span>
                                </label>
                            </div>

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
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;