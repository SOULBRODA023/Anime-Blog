import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

//  Get all posts
router.get("/", async (req, res) => {
	try {
		const posts = await prisma.post.findMany();
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

//  Get one post by ID
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const post = await prisma.post.findUnique({
			where: { id: Number(id) },
		});

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.json(post);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

//  Create a new post
router.post("/", async (req, res) => {
	try {
		const { title, content, status, authorId } = req.body;
		const newPost = await prisma.post.create({
			data: { title, content, status, authorId },
		});
		res.status(201).json(newPost);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

//  Update a post
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content, status } = req.body;

		const updatedPost = await prisma.post.update({
			where: { id: Number(id) },
			data: { title, content, status },
		});

		res.json(updatedPost);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

// Delete a post
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.post.delete({
			where: { id: Number(id) },
		});

		res.json({ message: "Post deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
