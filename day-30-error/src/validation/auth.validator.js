import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const error = validationResult(req);

    if (error.isEmpty()) {
        return next();
    }

    res.status(400).json({
        message: error.array(),
    });
};

export const registerValidation = [
    body("username").isString().withMessage("username should be string"),
    body("email").isEmail().withMessage("email should be a valid email"),
    body('password').isLength({min:6}).withMessage('password should be at least 6 characters long'),
    validate
];
