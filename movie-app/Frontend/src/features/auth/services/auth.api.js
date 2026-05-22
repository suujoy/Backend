import axios from "axios";

const api = axios.create({
    baseURL: "https://movieverse-25l8.onrender.com/api/auth",
    withCredentials: true,
});

export const register = async (formData) => {
    const { data } = await api.post("/register", formData);

    return data;
};



export const login = async ({ username, password }) => {
    const { data } = await api.post("/login", {
        username,
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
