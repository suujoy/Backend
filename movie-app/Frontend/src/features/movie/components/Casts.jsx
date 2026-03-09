import "../styles/casts.scss";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../services/movie.api";
import { Link } from "react-router";

const Casts = ({ movieId, mediaType }) => {
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                let data;

                if (mediaType === "tv") {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/tv/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                    );
                    data = await res.json();
                } else {
                    data = await getMovieCredits(movieId);
                }

                setCredits(data.cast || []);
            } catch (err) {
                console.log(err);
            }
        };

        if (movieId) {
            fetchCredits();
        }
    }, [movieId, mediaType]);

    const fallback =
        "https://ik.imagekit.io/teim9v6vi/movie%20poster.png";

    return (
        <div className="casts">
            <h2 className="casts-title">Top Cast</h2>

            <div className="casts-grid">
                {credits.slice(0, 12).map((actor) => {
                    const image = actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : fallback;

                    return (
                        <Link
                            to={`/person/${actor.id}`}
                            key={actor.id}
                            className="cast-card"
                        >
                            <div className="cast-img">
                                <img src={image} alt={actor.name} />
                            </div>

                            <p className="cast-name">
                                {actor.name}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Casts;