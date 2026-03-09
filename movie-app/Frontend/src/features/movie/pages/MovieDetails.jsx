import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useMovie } from "../hooks/useMovie";
import "../styles/movieDetails.scss";
import Casts from "../components/Casts";
import SimilarMovie from "../components/SimilerMovie";
import RecomandedMovie from "../components/RecomandedMovie";

const MovieDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const type = location.pathname.includes("tv") ? "tv" : "movie";
    const {
        movieDetails,
        trailer,
        loading,
        handleGetMovieDetails,
        handleGetMovieTrailer,
    } = useMovie();

    useEffect(() => {
        handleGetMovieDetails(id);
        handleGetMovieTrailer(id, type);
    }, [id]);

    if (loading || !movieDetails) {
        return <p className="details-loading">Loading...</p>;
    }

    const video = trailer?.find(
        (v) => v.site === "YouTube" && v.type === "Trailer",
    );

    const {
        title,
        release_date,
        vote_average,
        vote_count,
        genres,
        runtime,
        original_language,
        status,
        budget,
        revenue,
        tagline,
        overview,
        production_companies,
        production_countries,
        backdrop_path,
    } = movieDetails;

    const backdrop = backdrop_path
        ? `https://image.tmdb.org/t/p/original${backdrop_path}`
        : "";

    return (
        <section className="movie-details">
            <div
                className="details-banner"
                style={{ backgroundImage: `url(${backdrop})` }}
            />

            <Casts movieId={id} mediaType="movie" />

            <div className="details-container">
                <div className="details-main">
                    <div className="details-left">
                        <h1>{title}</h1>
                        <p className="tagline">{tagline}</p>

                        <div className="details-grid">
                            <p>
                                <strong>Release Year:</strong>{" "}
                                {release_date?.slice(0, 4)}
                            </p>
                            <p>
                                <strong>Rating:</strong> {vote_average}
                            </p>
                            <p>
                                <strong>Votes:</strong> {vote_count}
                            </p>
                            <p>
                                <strong>Runtime:</strong> {runtime} min
                            </p>
                            <p>
                                <strong>Language:</strong> {original_language}
                            </p>
                            <p>
                                <strong>Status:</strong> {status}
                            </p>
                            <p>
                                <strong>Budget:</strong> $
                                {budget?.toLocaleString()}
                            </p>
                            <p>
                                <strong>Revenue:</strong> $
                                {revenue?.toLocaleString()}
                            </p>
                        </div>

                        <div className="genres">
                            <strong>Genres:</strong>
                            {genres?.map((g) => (
                                <span key={g.id}>{g.name}</span>
                            ))}
                        </div>

                        <div className="overview">
                            <h3>Overview</h3>
                            <p>{overview}</p>
                        </div>

                        <div className="production">
                            <h3>Production Companies</h3>
                            <ul>
                                {production_companies?.map((c) => (
                                    <li key={c.id}>{c.name}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="countries">
                            <h3>Production Countries</h3>
                            <ul>
                                {production_countries?.map((c) => (
                                    <li key={c.iso_3166_1}>{c.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="details-right">
                        {video && (
                            <div className="trailer-box">
                                <h3>Trailer</h3>

                                <iframe
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title="movie trailer"
                                    width="100%"
                                    height="400"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* 
            similar movies */}

            <SimilarMovie movieId={id} />

            {/* Recomanded movie */}

            <RecomandedMovie movieId={id} />
        </section>
    );
};

export default MovieDetails;
