import React from "react";
import "./shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
