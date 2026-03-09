import { Link } from "react-router";
import "../styles/actorCard.scss";

const ActorCard = ({ actor }) => {
    const fallback = "https://ik.imagekit.io/teim9v6vi/movie%20poster.png";

    const image = actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : fallback;

    return (
        <Link to={`/person/${actor.id}`} className="actor-card">
            <div className="actor-image">
                <img src={image} alt={actor.name} />
            </div>

            <div className="actor-info">
                <h3>{actor.name}</h3>
                <p>{actor.known_for_department}</p>
                <span>⭐ {actor.popularity?.toFixed(1)}</span>
            </div>
        </Link>
    );
};

export default ActorCard;
