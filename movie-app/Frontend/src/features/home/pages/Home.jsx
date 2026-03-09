import { useEffect, useState } from "react";
import "../styles/home.scss";
import { useMovie } from "../../movie/hooks/useMovie";
import MovieCard from "../../movie/components/MovieCard";

const Home = () => {
    const { movies, loading, handleTrending } = useMovie();
    const [page, setPage] = useState(1);

    useEffect(() => {
        handleTrending(page);
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
        <main className="home">
            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {loading && <p>Loading more movies...</p>}
        </main>
    );
};

export default Home;
