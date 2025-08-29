import { body } from "express-validator";

export const signupValidation = [
    body('name')
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 20 })
        .withMessage("name must be between 3 to 20 characters"),
    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("write email in correct format"),
    body('password')
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6, max: 20 })
        .withMessage("password must be between 6 to 20 characters")
]

export const loginValidation = [
    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("write email in correct format"),
    body('password')
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6, max: 20 })
        .withMessage("password must be between 6 to 20 characters")
]

