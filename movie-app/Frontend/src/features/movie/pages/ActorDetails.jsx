import { useEffect } from "react";
import { useParams } from "react-router";
import { useMovie } from "../hooks/useMovie";
import MovieCard from "../components/MovieCard";
import "../styles/actorDetails.scss";

const ActorDetails = () => {
    const { id } = useParams();

    const {
        movies,
        loading,
        personDetails,
        handleGetPersonCredits,
        handleGetPersonDetails,
    } = useMovie();

    useEffect(() => {
        if (id) {
            handleGetPersonDetails(id);
            handleGetPersonCredits(id);
        }
    }, [id]);

    if (!personDetails) {
        return <p className="actor-loading">Loading actor...</p>;
    }
    const fallback = "https://ik.imagekit.io/teim9v6vi/movie%20poster.png";

    const image = personDetails.profile_path
        ? `https://image.tmdb.org/t/p/w500${personDetails.profile_path}`
        : fallback;

    return (
        <section className="actor-details">
            <div className="actor-header">
                <div className="actor-photo">
                    <img src={image} alt={personDetails.name} />
                </div>

                <div className="actor-info">
                    <h1>{personDetails.name}</h1>

                    <p>Department: {personDetails.known_for_department}</p>

                    <p>Popularity: {personDetails.popularity}</p>

                    <p>Birthday: {personDetails.birthday || "N/A"}</p>

                    <p>
                        Place of Birth: {personDetails.place_of_birth || "N/A"}
                    </p>
                </div>
            </div>

            <div className="actor-biography">
                <h2>Biography</h2>
                <p>{personDetails.biography || "Biography not available."}</p>
            </div>

            <div className="actor-filmography">
                <h2>Filmography</h2>

                {movies?.length > 0 && (
                    <div className="actor-grid">
                        {movies.map((item) => (
                            <MovieCard key={item.credit_id} movie={item} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ActorDetails;
