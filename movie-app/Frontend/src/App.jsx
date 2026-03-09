import React from "react";
import "./shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { MovieProvider } from "./features/movie/auth.context";

const App = () => {
    return (
        <AuthProvider>
            <MovieProvider>
                <RouterProvider router={router} />
            </MovieProvider>
        </AuthProvider>
    );
};

export default App;
