import { useContext } from "react";
import { MovieContext } from "../auth.context";
import {
    trending,
    popularMovies,
    getMovieTrailer,
    getMovieCredits,
    getMovieDetails,
    popularTv,
    popularPeople,
    getMovieImages,
    getRecommendations,
    multiSearch,
    getPersonCredits,
    getSimilarMovies,
    getPersonDetails,
} from "../services/movie.api";

export const useMovie = () => {
    const context = useContext(MovieContext);

    const {
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
        personDetails,
        setPersonDetails,
    } = context;

    /**
     * handleTrending
     */
    const handleTrending = async (page = 1) => {
        setLoading(true);
        try {
            const { results } = await trending(page);
            setMovies((prev) => [...prev, ...results]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handlePopularMovies
     */
    const handlePopularMovies = async (page = 1) => {
        setLoading(true);
        try {
            const { results } = await popularMovies(page);
            setMovies((prev) => [...prev, ...results]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetMovieTrailer
     */
    const handleGetMovieTrailer = async (id, type = "movie") => {
        setLoading(true);
        try {
            const { results } = await getMovieTrailer(id, type);
            setTrailer(results);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetMovieCredits
     */
    const handleGetMovieCredits = async (movieId) => {
        setLoading(true);
        try {
            const data = await getMovieCredits(movieId);
            setCredits(data.cast);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetMovieDetails
     */
    const handleGetMovieDetails = async (movieId) => {
        setLoading(true);
        try {
            const data = await getMovieDetails(movieId);
            setMovieDetails(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetMovieImages
     */
    const handleGetMovieImages = async (movieId) => {
        setLoading(true);
        try {
            const data = await getMovieImages(movieId);
            setImages(data.backdrops);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetRecommendations
     */
    const handleGetRecommendations = async (movieId) => {
        setLoading(true);
        try {
            const { results } = await getRecommendations(movieId);
            setRecommendations(results);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleMultiSearch
     */
    const handleMultiSearch = async (query) => {
        setLoading(true);
        try {
            const { results } = await multiSearch(query);
            setMovies(results);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handlePopularTv
     */
    const handlePopularTv = async (page = 1) => {
        setLoading(true);
        try {
            const { results } = await popularTv(page);
            setMovies((prev) => [...prev, ...results]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handlePopularPeople
     */
    const handlePopularPeople = async (page = 1) => {
        setLoading(true);
        try {
            const { results } = await popularPeople(page);
            setMovies((prev) => [...prev, ...results]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetPersonCredits
     */
    const handleGetPersonCredits = async (personId) => {
        setLoading(true);
        try {
            const data = await getPersonCredits(personId);

            const filtered = data.cast.filter((item) => item.poster_path);

            setMovies(filtered);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetSimilarMovies
     */
    const handleGetSimilarMovies = async (movieId) => {
        setLoading(true);
        try {
            const { results } = await getSimilarMovies(movieId);
            setRecommendations(results);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetPersonDetails
     */

    const handleGetPersonDetails = async (personId) => {
        setLoading(true);
        try {
            const data = await getPersonDetails(personId);
            setPersonDetails(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        personDetails,
        movies,
        movieDetails,
        credits,
        images,
        recommendations,
        trailer,
        handleTrending,
        handlePopularMovies,
        handleGetMovieTrailer,
        handleGetMovieCredits,
        handleGetMovieDetails,
        handleGetMovieImages,
        handleGetRecommendations,
        handleMultiSearch,
        handlePopularTv,
        handlePopularPeople,
        handleGetPersonCredits,
        handleGetSimilarMovies,
        handleGetPersonDetails,
    };
};
