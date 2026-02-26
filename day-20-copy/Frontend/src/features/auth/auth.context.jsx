import { createContext, useState } from "react";
import { register, login, getMe } from "./services/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handelLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            setUser(response.user);
            // return response
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handelRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, handelLogin, handelRegister }}
        >
            {children}
        </AuthContext.Provider>
    );
};
