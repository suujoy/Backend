import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <PostContext.Provider
            value={{ post, setPost, loading, setLoading, user, setUser }}
        >
            {children}
        </PostContext.Provider>
    );
};
