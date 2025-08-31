import express, { Router } from "express";
import postsRouter from "./server/routes/posts.js";
import signupRouter from "./server/routes/registerauthor.js";
import loginRouter from "./server/routes/login.js";
import { configDotenv } from "dotenv";
import cors from "cors"
const app = express();


app.use(
	cors({
		origin: ["http://localhost:5173", "https://otaku-blog.netlify.app"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(express.json());

//routes
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/posts", postsRouter);
app.use("/api/registerauthor", signupRouter);
app.use("/api/login", loginRouter);

app.listen("4000", () => {
    console.log("listening on port 4000")
});