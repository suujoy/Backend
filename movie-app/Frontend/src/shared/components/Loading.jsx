import React from "react";
import '../styles/loading.scss';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>

            <div className="skeleton-wrapper">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-card"></div>
            </div>
        </div>
    );
};

export default Loading;
