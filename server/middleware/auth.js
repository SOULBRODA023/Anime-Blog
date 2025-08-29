import { verifyToken } from "../util/jwt";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return
    res.statud(401).json({ error: "Please log in to access this page." });
    const payload = verifyToken(token);
    if (!payload) return res.status(403).json({ message: "session expired, please login again" })
    req.user = payload;
    next();
}
