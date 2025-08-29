const router = require("express").Router();
const { prismaClient } = require("@prisma/client");
const prisma = new prismaClient();

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