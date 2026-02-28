import { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import "../styles/feed.scss";
import SinglePost from "../components/SinglePost";
// import Post from "../components/Post";

const Feed = () => {
    const { post, handleGetPost,loading } = usePost();

    const fetchData = async () => {
        await handleGetPost();
        console.log("Post fetched");
    };

    useEffect(() => {
        fetchData();
    },[]);

    if(loading){
        return <main><h1>Loading......</h1></main>
    }

    return (
        <main className="feed-page">
            <div className="posts">
                {/**
                 * Single Post
                 */}
                {post.map((post) => {
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
