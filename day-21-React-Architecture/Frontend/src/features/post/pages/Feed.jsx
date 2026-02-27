import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";

const Feed = () => {
    const { feed, handleGetFeed, loading } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    if (loading) {
        return (
            <main>
                <h1>Loading....</h1>
            </main>
        );
    }
    console.log(feed);
    return (
        <main className="feed-page">
            <div className="feed">
                <div className="posts">
                    {feed?.map((post) => (
                        <Post key={post._id} user={post.user} post={post} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Feed;
