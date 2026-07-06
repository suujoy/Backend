import React from "react";
import useTheme from "../hooks/useTheme";
import useThemeToggle from "../hooks/useThemeToggle";

const ThemeToggle = () => {
    const theme = useTheme();
    const toggleTheme = useThemeToggle();

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-input-bg border border-input-border text-text-main hover:text-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm cursor-pointer"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                // Sun Icon
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m0 13.5V21M4.22 4.22l1.58 1.58m12.42 12.42l1.58 1.58M3 12h2.25m13.5 0H21M4.22 19.78l1.58-1.58m12.42-12.42l1.58-1.58M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"
                    />
                </svg>
            ) : (
                // Moon Icon
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
