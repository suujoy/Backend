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
    } = context;

    /**
     * handleTrending
     */
    const handleTrending = async () => {
        setLoading(true);
        try {
            const { results } = await trending();
            setMovies(results);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handlePopularMovies
     */
    const handlePopularMovies = async (page) => {
        setLoading(true);
        try {
            const { results } = await popularMovies(page);
            setMovies(results);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGetMovieTrailer
     */
    const handleGetMovieTrailer = async (movieId) => {
        setLoading(true);
        try {
            const { results } = await getMovieTrailer(movieId);
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
    const handlePopularTv = async (page) => {
        setLoading(true);
        try {
            const { results } = await popularTv(page);
            setMovies(results);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handlePopularPeople
     */
    const handlePopularPeople = async (page) => {
        setLoading(true);
        try {
            const { results } = await popularPeople(page);
            setMovies(results);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
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
    };
};
