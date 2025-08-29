import express from "express";
import registerAuthor from "../controller/registerauthorcontroller";
import { signupValidation } from "../middleware/validation";
import { validationResult } from "express-validator";
const router = express.Router();

router.get("/", signupValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    registerAuthor(req, res);
});