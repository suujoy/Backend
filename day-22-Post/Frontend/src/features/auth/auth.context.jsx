/**
 * Import From React
 */
import { createContext, useState } from "react";

/**
 * It Will Return From this components
 */
export const AuthContext = createContext();

/**
 * State Management AuthProvider
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
