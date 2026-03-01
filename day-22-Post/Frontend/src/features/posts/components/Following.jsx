import React from "react";

const Following = () => {
    return (
        <div className="following follow">
            <h2>Following</h2>

            {/**
             * All User Container
             */}
            <div className="container">
                {/**
                 * Single User
                 */}
                <div className="user">
                    {/**
                     * Left Container
                     */}
                    <div className="left">
                        {/**
                         * Profile Immage of User
                         */}
                        <img
                            src="https://images.unsplash.com/photo-1770873263537-fbb8d39b6103?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="profilePicture"
                        />
                        {/**
                         * User Name
                         */}
                        <p className="username">UserName</p>
                    </div>
                    {/**
                     * Unfollow button
                     */}
                    <button className="button unfollow-btn">Unfollow</button>
                </div>
            </div>
        </div>
    );
};

export default Following;
