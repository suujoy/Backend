import React from "react";
import Follower from "../components/Follower";
import Following from "../components/Following";
import OtherUser from "../components/OtherUser";
import "../styles/menu.scss";
import { useNavigate } from "react-router";

const Menu = () => {
    const navigate = useNavigate();

    return (
        <main className="menu-page">
            <nav className="nav">
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className="button primary-button"
                >
                    <img src="/back-png.webp" alt="back" />
                </button>
            </nav>

            <div className="hero-follow">
                <Follower />
                <Following />
                <OtherUser />
            </div>
        </main>
    );
};

export default Menu;
