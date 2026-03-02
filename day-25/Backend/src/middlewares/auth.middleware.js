const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const identifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "Token not Found",
        });
    }

    const isTokenBlacklisted = await redis.get(token)

    if (isTokenBlacklisted) {
        return res.status(400).json({
            message: "Invalid Token",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token",
        });
    }
};

module.exports = { identifyUser };
