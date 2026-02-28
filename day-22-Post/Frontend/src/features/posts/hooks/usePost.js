import { useContext } from "react";
import { PostContext } from "../post.context";
import { getPost } from "../services/post.api";

export const usePost = () => {
    const context = useContext(PostContext);

    const { user, setUser, loading, setLoading, post, setPost } = context;

    const handleGetPost = async () => {
        setLoading(true);

        const { posts } =await getPost();
        setPost(posts);
        setLoading(false);
    };

    return { post, loading, user, setUser, handleGetPost };
};
