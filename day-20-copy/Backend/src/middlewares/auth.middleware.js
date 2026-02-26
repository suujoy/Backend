const jwt = require("jsonwebtoken");

const identifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "Token not found",
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token , Unauthorize token",
        });
    }

    req.user = decoded;
    next();
};

module.exports = identifyUser;
