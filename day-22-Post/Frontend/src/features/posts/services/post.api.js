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

export const createPost = async (imgUrl, caption) => {
    const formData = new FormData();

    formData.append("image", imgUrl);
    formData.append("caption", caption);

    const { data } = await api.post("/", formData);

    return data;
};

export const likePost = async (postId) => {
    const response = await api.post("/like/" + postId);
    return response.data;
};

export const unLikePost = async (postId) => {
    const response = await api.post("/unlike/" + postId);
    return response.data;
};
