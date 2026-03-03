const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");

const identifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication token not found",
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or Unauthorize token",
        });
    }
};


module.exports=identifyUser