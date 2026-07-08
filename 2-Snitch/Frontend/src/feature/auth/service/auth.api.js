import axios from "axios";
import { config } from "../../../config/config";


const authApi = axios.create({
    baseURL: `${config.baseURL}/api/auth`,
    withCredentials: true
})

export const registerUser = async ({ email, contact, password, fullName, isSeller, isAdmin }) => {
    const { data } = await authApi.post('/register', {
        email,
        contact,
        password,
        fullName,
        isSeller,
        isAdmin
    })

    return data
}

export const loginUser = async ({ identifier, password }) => {
    const { data } = await authApi.post('/login', {
        email: identifier,
        contact: identifier,
        password
    })

    return data
}