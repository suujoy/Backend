import { Link } from "react-router";
import { useState } from "react";
import { useMovie } from "../../movie/hooks/useMovie";
import "../styles/nav.scss";

const Nav = () => {
    const [query, setQuery] = useState("");
    const { handleMultiSearch } = useMovie();

    const handleSearch = () => {
        if (query.trim()) {
            handleMultiSearch(query);
        }
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/">MovieVerse</Link>
                </div>

                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/movies">Movies</Link>
                    </li>
                    <li>
                        <Link to="/tv-shows">TV Shows</Link>
                    </li>
                    <li>
                        <Link to="/actors">Actors</Link>
                    </li>
                </ul>

                <div className="nav-search">
                    <input
                        type="text"
                        placeholder="Search movies, tv, actors..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
