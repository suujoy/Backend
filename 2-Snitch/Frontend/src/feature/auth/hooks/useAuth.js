import { registerUser, loginUser } from "../service/auth.api";
import { setError, setUser, setLoading } from "../state/auth.slice";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {

    const dispatch = useDispatch()
    const { user, loading, error } = useSelector((state) => state.auth);

    const handleRegister = async ({ email, contact, password, fullName, isSeller = false, isAdmin = false }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await registerUser({ email, contact, password, fullName, isSeller, isAdmin });
            
            const userData = data?.user || data;
            dispatch(setUser(userData));
            return userData;
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || "Registration failed";
            dispatch(setError(errMsg));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleLogin = async ({ identifier, password }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await loginUser({ identifier, password });

            const userData = data?.user || data;
            dispatch(setUser(userData));
            return userData;
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || "Login failed";
            dispatch(setError(errMsg));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin, user, loading, error }
}