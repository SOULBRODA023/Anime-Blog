import express from "express";
import registerAuthor from "../controller/registerauthorcontroller.js";
import { signupValidation } from "../middleware/validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

const validateSignup = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}
	next();
};

router.post("/", signupValidation, validateSignup, registerAuthor);



export default router;
