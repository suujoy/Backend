import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const register = async ({ username, email, password }) => {
    const { data } = await api.post("/register", {
        username,
        email,
        password,
    });

    return data;
};

export const login = async ({ username, email, password }) => {
    const { data } = await api.post("/login", {
        email,
        password,
    });

    return data;
};

export const getMe = async () => {
    const { data } = await api.get("/get-me");

    return data;
};

export const logout = async () => {
    const { data } = await api.get("/logout");

    return data;
};
