import React, { useRef, useState } from "react";
import "../styles/CreatePost.scss";
import { usePost } from "../hooks/usePost";
import {useNavigate} from 'react-router'

const CreatePost = () => {
    const navigate = useNavigate()
    const { loading, handleCreatePost } = usePost();

    const [caption, setCaption] = useState("");
    const postImageInputFieldRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const file = postImageInputFieldRef.current.files[0];
        await handleCreatePost(file, caption);
        navigate('/')
    };

    if (loading) {
        return (
            <main>
                <h1>Creating Post...</h1>
            </main>
        );
    }

    return (
        <main className="create-post-page">
            <div className="form-container">
                <h1>Create Post</h1>
                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}
                >
                    <label className="postImageLabel" htmlFor="postImage">
                        Select Image
                    </label>
                    <input
                        hidden
                        ref={postImageInputFieldRef}
                        type="file"
                        name="postImage"
                        id="postImage"
                        placeholder="Select Image"
                    />
                    <input
                        onChange={(event) => {
                            setCaption(event.target.value);
                        }}
                        value={caption}
                        type="text"
                        name="caption"
                        id="caption"
                        placeholder="Caption"
                    />
                    <button className="button primary-button">
                        Create Post
                    </button>
                </form>
            </div>
        </main>
    );
};

export default CreatePost;
