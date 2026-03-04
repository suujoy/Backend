import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const { user } = await register({ username, email, password });
            setUser(user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const { user } = await login({ username, email, password });
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
            const response = await logout();
            setUser(null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(()=>{
        handleGetMe()
    },[])

    return {
        handleLogin,
        handleRegister,
        handleGetMe,
        handleLogout,
        user,
        loading,
    };
};
