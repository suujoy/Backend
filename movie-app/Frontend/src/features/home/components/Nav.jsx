import { Link } from "react-router";
import "../styles/nav.scss";

const Nav = () => {
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
                        <Link to="/tv">TV Shows</Link>
                    </li>
                    <li>
                        <Link to="/people">People</Link>
                    </li>
                </ul>

                <div className="nav-search">
                    <input
                        type="text"
                        placeholder="Search movies, tv, actors..."
                    />
                </div>
            </div>
        </nav>
    );
};

export default Nav;
