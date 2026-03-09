import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/home/pages/Home";
import MainLayout from "./layouts/MainLayout";
import MovieDetails from "./features/movie/pages/MovieDetails";
import TvShow from "./features/movie/pages/TvShows";
import Actors from "./features/movie/pages/Actors";
import ActorDetails from "./features/movie/pages/ActorDetails";
import PopularMovie from "./features/movie/pages/PopularMovies";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: (
                    <Protected>
                        <Home />
                    </Protected>
                ),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/movie/:id",
                element: <MovieDetails />,
            },
            {
                path: "/tv-shows",
                element: <TvShow />,
            },
            {
                path: "/actors",
                element: <Actors />,
            },
            {
                path: "/person/:id",
                element: <ActorDetails />,
            },
            {
                path: "/movies",
                element: <PopularMovie />,
            },
            {
                path: "/tv/:id",
                element: <MovieDetails />,
            },
        ],
    },
]);
