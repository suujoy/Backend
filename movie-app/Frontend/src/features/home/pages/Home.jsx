import React from "react";
import "../styles/home.scss";
import { useMovie } from "../../movie/hooks/useMovie";
import { useEffect } from "react";
import Nav from "../components/Nav";

const Home = () => {
    const { movies, loading, handleTrending } = useMovie();
    useEffect(() => {
        handleTrending();
    }, []);
    return (
        <main className="home">
            <Nav />

            {loading && <p>Loading...</p>}

            {!loading && (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <div key={movie.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                            />
                            <h3>{movie.title || movie.name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default Home;
