import { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import "../styles/feed.scss";
import SinglePost from "../components/SinglePost";
import Nav from "../../shared/components/Nav";
// import Post from "../components/Post";

const Feed = () => {
    const { feed, handleGetFeed, loading, handleLike, handleUnLike } =
        usePost();

    const fetchData = async () => {
        await handleGetFeed();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main className="feed-page">
            <Nav />
            <div className="posts">
                {/**
                 * Single Post
                 */}
                {feed.map((post) => {
                    return (
                        <SinglePost
                            key={post._id}
                            post={post}
                            user={post.user}
                            handleLike={handleLike}
                            handleUnLike={handleUnLike}
                            loading={loading}
                        />
                    );
                })}
            </div>
        </main>
    );
};

export default Feed;
