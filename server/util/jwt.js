import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "fallbackSecret";

export function generateToken(payload, expiresIn = "1h") {
	return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function verifyToken(token) {
	try {
		return jwt.verify(token, SECRET_KEY);
	} catch (err) {
		return null;
	}
}
