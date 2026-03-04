import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
