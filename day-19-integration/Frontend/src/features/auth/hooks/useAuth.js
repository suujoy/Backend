const { useContext } = require("react");
const { AuthContext } = require("../auth.context.jsx");

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};
