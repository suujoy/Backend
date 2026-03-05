import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/song",
    withCredentials: true,
});

export const uploadSong = async ({ url, postUrl, title, mood }) => {
    const { data } = await api.post("/", {
        url,
        postUrl,
        title,
        mood,
    });

    return data;
};

export const getSong = async ({ mood }) => {
    const { data } = await api.get("/?mood=" + mood);

    return data;
};
