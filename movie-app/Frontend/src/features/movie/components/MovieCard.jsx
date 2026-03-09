import React from "react";
import "../styles/movieCard.scss";
import { Link } from "react-router";

const MovieCard = ({ movie }) => {
    const fallback = "https://ik.imagekit.io/teim9v6vi/movie%20poster.png";

    const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : fallback;

    return (
        <Link
            to={`/${movie.media_type || "movie"}/${movie.id}`}
            className="movie-card"
        >
            <div className="poster">
                <img src={image} alt={movie.title || movie.name} />
            </div>

            <div className="movie-info">
                <h3>{movie.title || movie.name}</h3>
                <p>⭐ {movie.vote_average}</p>
            </div>
        </Link>
    );
};

export default MovieCard;
