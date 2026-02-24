import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handelLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            setUser(response.user);
            return response;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handelRegister = async (email, username, password) => {
        setLoading(true);

        try {
            const response = await register(email, username, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <authContext.Provider
            value={{ user, loading, handelLogin, handelRegister }}
        >
            {children}
        </authContext.Provider>
    );
};
