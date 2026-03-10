import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, register } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handelLogin = async (username, password) => {
        setLoading(true);

        try {
            const { user } = await login(username, password);
            setUser(user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handelRegister = async (username, email, password) => {
        setLoading(true);

        try {
            const { user } = await register(username, email, password);
            setUser(user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handelGetMe = async () => {
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

    return {
        user,
        loading,
        handelLogin,
        handelRegister,
        handelGetMe,
    };
};
