import { useEffect, useState } from "react";
import { getSimilarMovies } from "../services/movie.api";
import MovieCard from "./MovieCard";
import "../styles/similarMovie.scss";

const SimilarMovie = ({ movieId }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getSimilarMovies(movieId);
                setMovies(data.results);
            } catch (err) {
                console.log(err);
            }
        };

        if (movieId) {
            fetchMovies();
        }
    }, [movieId]);

    return (
        <div className="similar-movie">
            <h2 className="similar-title">Similar Movies</h2>

            <div className="similar-grid">
                {movies.slice(0, 8).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default SimilarMovie;
