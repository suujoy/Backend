import React from "react";

const SinglePost = ({ post, user }) => {
    return (
        <div className="post">
            <div className="user">
                <div className="img-wrapper">
                    <img src={user?.profileImage} alt="" />
                </div>
                <div className="username">{user?.username}</div>
            </div>

            <img src={post.imgUrl} alt="" />

            <div className="icons">
                <div className="left"></div>
                <div className="right"></div>
            </div>

            <div className="bottom">{post.caption}</div>
        </div>
    );
};

export default SinglePost;
