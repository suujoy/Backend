import { useDispatch } from "react-redux";
import { toggleTheme } from "../state/themeSlice";

const useThemeToggle = () => {
    const dispatch = useDispatch();

    return () => dispatch(toggleTheme());
};

export default useThemeToggle;