import { useEffect, useState } from "react";
import { getRecommendations } from "../services/movie.api";
import MovieCard from "./MovieCard";
import "../styles/recomandedMovie.scss";

const RecomandedMovie = ({ movieId }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getRecommendations(movieId);
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
        <div className="recomanded-movie">

            <h2 className="recomanded-title">
                Recommended Movies
            </h2>

            <div className="recomanded-grid">
                {movies.slice(0, 8).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

        </div>
    );
};

export default RecomandedMovie;