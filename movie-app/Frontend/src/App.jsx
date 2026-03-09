import React from "react";
import "./shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { MovieContext } from "./features/movie/auth.context";

const App = () => {
    return (
        <AuthProvider>
            <MovieContext>
                <RouterProvider router={router} />
            </MovieContext>
        </AuthProvider>
    );
};

export default App;
