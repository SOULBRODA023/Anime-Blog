import express from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const router = express.Router();

//fetch all posts  from the database
//returns an array of post in json format 
router.get("/", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });//latest posts first
        res.send("post is here");
        res.json(posts)//send posts as response
      
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Something went wrong"
        })
    }
});

//POST /api/posts
//Create a new post 
//expect { title and content } in request body 
router.post("/", async(req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = await prisma.post.create({
            data: { title, content }//save post to database
        });
        res.status(201),json(newPost)// return the created post 
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "could not create post" });
    }
})



export default router;
