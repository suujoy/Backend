import "../styles/feed.scss";

const Feed = () => {
    return (
        <main className="feed-page">
            <div className="posts">
                {/**
                 * Single Post
                 */}
                <div className="post">
                    <div className="user">
                        <div className="img-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1770954179366-7a85687c1b64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D"
                                alt=""
                            />
                        </div>
                        <div className="username">username</div>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1772173333598-31ffc020d58a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />

                    <div className="icons">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>

                    <div className="bottom">username_username</div>
                </div>
            </div>
        </main>
    );
};

export default Feed;
