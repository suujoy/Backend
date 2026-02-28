import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import {
    createPost,
    getPost,
    likePost,
    unLikePost,
} from "../services/post.api";

export const usePost = () => {
    const context = useContext(PostContext);

    const { feed, setFeed, loading, setLoading, post, setPost } = context;

    const handleGetFeed = async () => {
        setLoading(true);

        const { posts } = await getPost();
        setFeed(posts);
        setLoading(false);
    };

    const handleCreatePost = async (imgUrl, caption) => {
        setLoading(true);
        const { post } = await createPost(imgUrl, caption);
        setFeed([post, ...feed]);
        setLoading(false);
    };

    const handleLike = async (post) => {
        setLoading(true);
        const data = await likePost(post);
        await handleGetFeed()
        setLoading(false);
    };
    
    const handleUnLike = async (post) => {
        setLoading(true);
        const data = await unLikePost(post);
        await handleGetFeed()
        setLoading(false);
    };

    useEffect(() => {
        handleGetFeed();
    }, []);

    return {
        post,
        loading,
        feed,
        handleGetFeed,
        handleCreatePost,
        handleLike,
        handleUnLike,
    };
};
