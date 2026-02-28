import axios from "axios";

/**
 * Create Instance
 */

const api = axios.create({
    baseURL: "http://localhost:3000/api/post",
    withCredentials: true,
});

export const getPost = async () => {
    const { data } = await api.get("/feed");
    return data;
};
