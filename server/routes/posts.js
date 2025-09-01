import express from "express";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth";
const prisma = new PrismaClient();
const router = express.Router();

//  Get all posts
router.get("/", auth, async (req, res) => {
	try {
		const posts = await prisma.post.findMany();
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

//  Get one post by ID
router.get("/:id", auth, async (req, res) => {
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
router.post("/", auth, async (req, res) => {
	try {
		const { title, content, status } = req.body;

		const userId = req.user.id; // decoded from token 🎉

		const newPost = await prisma.post.create({
			data: { title, content, status, authorId: userId },
		});

		res.status(201).json(newPost);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});




//  Update a post
router.put("/:id", auth,async (req, res) => {
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
router.delete("/:id", auth, async (req, res) => {
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
