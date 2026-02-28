import axios from "axios";

/**
 * Create Intance For Auth Api
 */

const api = axios.create({
    baseURL: "https://backend-3-0w8o.onrender.com/api/auth",
    withCredentials: true,
});

/**
 * Sends user login credentials to the server and returns the response data.
 * Login Api
 */
export const login = async (username, password) => {
    const { data } = await api.post("/login", {
        username,
        password,
    });

    return data;
};

/**
 * Sends user registration details to the server and returns the response data.
 * Register Api
 */
export const register = async (username, email, password) => {
    const { data } = await api.post("/register", {
        username,
        email,
        password,
    });

    return data;
};

/**
 * Fetches the currently authenticated user data from the server.
 * Get-Me Api
 */
export const getMe = async () => {
    const { data } = await api.get("/get-me");

    return data;
};
