import { useEffect, useState } from "react";
import { useMovie } from "../hooks/useMovie";
import ActorCard from "../components/ActorCard";
import "../styles/actors.scss";

const Actors = () => {
    const { movies, loading, handlePopularPeople } = useMovie();
    const [page, setPage] = useState(1);

    useEffect(() => {
        handlePopularPeople(page);
    }, [page]);

    useEffect(() => {
        const onScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 200;

            if (bottom) {
                setPage((p) => p + 1);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section className="actors-page">
            <div className="actors-header">
                <h1>Popular Actors</h1>
                <p>Discover trending actors and celebrities</p>
            </div>

            <div className="actors-grid">
                {movies.map((actor) => (
                    <ActorCard key={actor.id} actor={actor} />
                ))}
            </div>

            {loading && (
                <p className="actors-loading">Loading more actors...</p>
            )}
        </section>
    );
};

export default Actors;