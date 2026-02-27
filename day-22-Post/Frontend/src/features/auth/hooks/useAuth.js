/**
 * import
 */
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, register } from "../services/auth.api";

/**
 * Create Hook
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    /**
     * Create Handle Login Function
     */
    const handleLogin = async (username, password) => {
        setLoading(true);

        const { user } = await login(username, password);
        setUser(user);
        setLoading(false);
    };

    /**
     * Create Handle Register Function
     */
    const handleRegister = async (username, email, password) => {
        setLoading(true);

        const { user } = await register(username, email, password);

        setUser(user);
        setLoading(false);
    };

    /**
     * Create Handle Get Me function
     */
    const handleGetMe = async () => {
        setLoading(true);

        const { user } = await getMe();
        setUser(user);
        setLoading(false);
    };

    /**
     * Return From this function
     */
    return {
        user,
        loading,
        handleLogin,
        handleGetMe,
        handleRegister,
    };
};
