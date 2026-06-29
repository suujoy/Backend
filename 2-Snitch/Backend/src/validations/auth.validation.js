import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateRegister = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("contact")
        .trim()
        .notEmpty()
        .withMessage("Contact is required")
        .isMobilePhone("en-IN")
        .withMessage("Please enter a valid contact number"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 characters long"),

    body("role")
        .optional()
        .isIn(["seller", "buyer"])
        .withMessage("Role must be either 'seller' or 'buyer'"),

    body("isAdmin")
        .optional()
        .isBoolean()
        .withMessage("isAdmin must be a boolean"),

    validate,
];
