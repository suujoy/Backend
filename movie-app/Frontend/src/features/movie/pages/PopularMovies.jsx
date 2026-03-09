import { useEffect, useState } from "react";
import { useMovie } from "../hooks/useMovie";
import MovieCard from "../components/MovieCard";
import "../styles/popularMovie.scss";

const PopularMovie = () => {
    const { movies, loading, handlePopularMovies } = useMovie();
    const [page, setPage] = useState(1);

    useEffect(() => {
        handlePopularMovies(page);
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 200;

            if (bottom) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="popular-movie-page">

            <div className="popular-header">
                <h1>Popular Movies</h1>
                <p>Discover trending movies loved by audiences</p>
            </div>

            <div className="popular-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {loading && (
                <p className="popular-loading">
                    Loading more movies...
                </p>
            )}

        </section>
    );
};

export default PopularMovie;