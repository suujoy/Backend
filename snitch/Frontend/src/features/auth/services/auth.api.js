import axios from "axios";
import { config } from "../../../config/config.js"

const authApi = axios.create({
    baseURL: `${config.apiBaseUrl}/api/auth`,
    withCredentials: true
})

export const registerUser = async (email, contact, password, fullName, isSeller = false) => {
    try {
        const { data } = await authApi.post('/register', { email, contact, password, fullName, isSeller })
        return data
    } catch (error) { 
        console.log(error)
    }
}