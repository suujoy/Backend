const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User Already exist with this email",
        });
    }

    const user = await userModel.create({
        name,
        email,
        password,
    });

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
    );

    res.cookie('jwt_cookie',token)

    res.status(201).json({
        message: "User Created",
        user,
        token,
    });
});

module.exports = authRouter;
