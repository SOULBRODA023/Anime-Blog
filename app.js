import express from "express";
const app = express();
import postsRouter from "./server/routes/posts.js";

app.use(express.json());
app.get("/", (req, res) => {
    res.send("you are in")
});

app.use("/api/posts", postsRouter);

app.listen("4000", () => {
    console.log("listening on port 4000")
});