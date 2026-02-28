import { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import "../styles/feed.scss";
import SinglePost from "../components/SinglePost";
// import Post from "../components/Post";

const Feed = () => {
    const { feed, handleGetFeed, loading } = usePost();

    const fetchData = async () => {
        await handleGetFeed();
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <main>
                <h1>Loading......</h1>
            </main>
        );
    }

    console.log(feed)

    return (
        <main className="feed-page">
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
                        />
                    );
                })}
            </div>
        </main>
    );
};

export default Feed;
