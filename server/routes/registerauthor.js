import express from "express";
import registerAuthor from "../controller/registerauthorcontroller.js";
import { signupValidation } from "../middleware/validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.post("/", signupValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    registerAuthor(req, res);
    res.send("in")
});

export default router;
