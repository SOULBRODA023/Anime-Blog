const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("you are in")
});

app.use("/api/posts", require("./server/routes/posts"));

app.listen("4000", () => {
    console.log("listening on port 4000")
});