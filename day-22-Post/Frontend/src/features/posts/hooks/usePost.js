import { useContext } from "react";
import { PostContext } from "../post.context";
import { getPost } from "../services/post.api";

export const usePost = () => {
    const context = useContext(PostContext);

    const { feed, setFeed, loading, setLoading, post, setPost } = context;

    const handleGetFeed = async () => {
        setLoading(true);

        const { posts } = await getPost();
        setFeed(posts);
        setLoading(false);
    };

    return { post, loading, feed, handleGetFeed };
};
