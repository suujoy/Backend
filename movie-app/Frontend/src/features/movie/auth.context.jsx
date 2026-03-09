import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);
    const [credits, setCredits] = useState([]);
    const [images, setImages] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <MovieContext.Provider
            value={{
                movies,
                setMovies,
                movieDetails,
                setMovieDetails,
                credits,
                setCredits,
                images,
                setImages,
                recommendations,
                setRecommendations,
                trailer,
                setTrailer,
                loading,
                setLoading,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
