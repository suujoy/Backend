export const applyTheme = (theme) => {
    const html = document.documentElement;

    if (theme === "dark") {
        html.classList.add("dark");
    } else {
        html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
};

export const getStoredTheme = () => {
    return (
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light")
    );
};