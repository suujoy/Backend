import { setUser, setLoading, setError } from '../state/auth.slice.js'
import { registerUser } from '../services/auth.api.js'
import { useDispatch } from 'react-redux'

export const useAuth = (children) => {

    const dispatch = useDispatch()


    const handleRegister = async (email, contact, password, fullName, isSeller = false) => {
        try {
            const { user } = await registerUser({ email, contact, password, fullName, isSeller })
            dispatch(setUser(user))

        } catch (error) {
            console.log(error);
        }
    }

    return { handleRegister }
}