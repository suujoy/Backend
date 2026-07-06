import { createSlice } from "@reduxjs/toolkit";

import { getStoredTheme } from "../utils/theme";

const initialState = {
    theme: getStoredTheme(),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },

        toggleTheme: (state) => {
            state.theme = state.theme === "dark" ? "light" : "dark";
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;