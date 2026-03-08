import { useContext, useEffect } from "react";

import { AuthContext } from "../auth.context";
import { register, login, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async (formData) => {
        setLoading(true);
        try {
            const { user } = await register(formData);
            setUser(user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async ({ username, password }) => {
        setLoading(true);
        try {
            const { user } = await login({ username, password });
            setUser(user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGetMe = async () => {
        setLoading(true);
        try {
            const { user } = await getMe();
            setUser(user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetMe();
    }, []);

    return {
        user,
        setUser,
        loading,
        setLoading,
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
    };
};
