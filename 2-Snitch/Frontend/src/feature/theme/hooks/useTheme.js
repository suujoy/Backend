import { useSelector } from "react-redux";

const useTheme = () => {
    return useSelector((state) => state.theme.theme);
};

export default useTheme;