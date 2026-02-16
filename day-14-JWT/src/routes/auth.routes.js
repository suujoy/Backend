const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    const { email, name, password } = req.body;
    const isUserAlreadyExist =await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User is already exist",
        });
    }

    const user = await userModel.create({
        email,
        password,
        name,
    });

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
    );

    res.status(201).json({
        message: "user register",
        user,
        token,
    });
});

module.exports = authRouter;
