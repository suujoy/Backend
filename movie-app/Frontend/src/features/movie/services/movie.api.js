import axios from "axios";
/**
 * Creating Axios Api Intense
 */
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

/**
 * Import Tmdb api key from .env
 */
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Trending Movis by day
 */
export const trending = async (page = 1) => {
    const { data } = await api.get(
        `/trending/all/day?api_key=${apiKey}&page=${page}`,
    );
    return data;
};

/**
 * Popular movies
 */
export const popularMovies = async (page = 1) => {
    const { data } = await api.get(
        `/movie/popular?api_key=${apiKey}&page=${page}`,
    );
    return data;
};

/**
 * For play youtube trailer for the movie
 */
export const getMovieTrailer = async (id, type = "movie") => {
    const { data } = await api.get(
        `/${type}/${id}/videos?api_key=${apiKey}`
    );
    return data;
};
/**
 * movie credits to show actors of a movie
 */
export const getMovieCredits = async (movieId) => {
    const { data } = await api.get(
        `/movie/${movieId}/credits?api_key=${apiKey}`,
    );
    return data;
};

/**
 * movie details
 */
export const getMovieDetails = async (movieId) => {
    const { data } = await api.get(`/movie/${movieId}?api_key=${apiKey}`);
    return data;
};

/**
 * TV shows
 */
export const popularTv = async () => {
    const { data } = await api.get(`/tv/popular?api_key=${apiKey}`);
    return data;
};

/**
 * people or actors
 */

export const popularPeople = async (page = 1) => {
    const { data } = await api.get(
        `/person/popular?api_key=${apiKey}&page=${page}`
    );
    return data;
};

/**
 * movie images or media
 */

export const getMovieImages = async (movieId) => {
    const { data } = await api.get(
        `/movie/${movieId}/images?api_key=${apiKey}`,
    );
    return data;
};

/**
 * similar or recommended movies
 */

export const getRecommendations = async (movieId) => {
    const { data } = await api.get(
        `/movie/${movieId}/recommendations?api_key=${apiKey}`,
    );
    return data;
};

/**
 * multi search for movies , TV shows, and people in one request
 */
export const multiSearch = async (query) => {
    const { data } = await api.get(
        `/search/multi?api_key=${apiKey}&query=${query}`,
    );
    return data;
};

/**
 * Actor based movie search tv show
 */

export const getPersonCredits = async (personId) => {
    const { data } = await api.get(
        `/person/${personId}/combined_credits?api_key=${apiKey}`,
    );
    return data;
};

/**
 * Similer Movies
 */

export const getSimilarMovies = async (movieId) => {
    const { data } = await api.get(
        `/movie/${movieId}/similar?api_key=${apiKey}`,
    );
    return data;
};

/**
 * actor details
 */

export const getPersonDetails = async (personId) => {
    if (!personId) return null;
    const { data } = await api.get(`/person/${personId}`, {
        params: { api_key: apiKey },
    });
    return data;
};
