import express from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const posts = await prisma.Post.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json(posts)
    }
    catch (err){
        console.error(err);
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

export default router;
