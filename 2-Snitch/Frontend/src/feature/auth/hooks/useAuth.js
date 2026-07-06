import { registerUser } from "../service/auth.api";
import { setError, setUser, setLoading } from "../state/auth.slice";
import { useDispatch } from "react-redux";

export const useAuth = () => {

    const dispatch = useDispatch()


    const handleRegister = async ({ email, contact, password, fullName, isSeller = false, isAdmin }) => {
        const { user } = await registerUser({ email, contact, password, fullName, isSeller, isAdmin })

        dispatch(setUser(user))
    }

    return { handleRegister }
}