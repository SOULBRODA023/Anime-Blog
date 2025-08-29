import express, { Router } from "express";
const app = express();
import postsRouter from "./server/routes/posts.js";
import signupRouter from "./server/routes/registerauthor.js";
import loginRouter from "./server/routes/login.js";

app.use(express.json());
app.get("/", (req, res) => {
    res.send("you are in")
});

app.use("/api/posts", postsRouter);
app.use("/api/registerauthor", signupRouter);
app.use("/api/login", loginRouter);

app.listen("4000", () => {
    console.log("listening on port 4000")
});