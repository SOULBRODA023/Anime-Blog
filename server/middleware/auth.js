import { verifyToken } from "../util/jwt.js";

export default function Auth(req, res, next) {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		return res.status(403).json({ message: "No token provided" });
	}

	const token = authHeader.split(" ")[1]; // "Bearer <token>"

	const decoded = verifyToken(token);
	if (!decoded) {
		return res.status(403).json({ message: "Invalid or expired token" });
	}

	req.user = decoded; // attach user info to request
	next();
}
