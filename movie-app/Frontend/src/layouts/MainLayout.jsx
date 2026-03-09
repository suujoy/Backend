import React from "react";
import Nav from "../features/home/components/Nav";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
};

export default MainLayout;
