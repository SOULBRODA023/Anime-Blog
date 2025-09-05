import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// ================== POSTS ==================

// Get all published posts
router.get("/", async (req, res) => {
	try {
		const posts = await prisma.post.findMany({
			where: { status: "PUBLISHED" },
			orderBy: { createdAt: "desc" },
		});
		res.json(posts);
	} catch (err) {
		console.error("Error fetching posts:", err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get a single post with comments
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const post = await prisma.post.findUnique({
			where: { id: Number(id) },
			include: { comments: { orderBy: { createdAt: "desc" } } }, // include comments
		});

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.json(post);
	} catch (err) {
		console.error("Error fetching post:", err);
		res.status(500).json({ message: "Server error" });
	}
});

// ================== COMMENTS ==================

// Add a comment to a post
router.post("/:id/comments", async (req, res) => {
	try {
		const { id } = req.params;
		const { title, name, content } = req.body;

		if (!name || !content) {
			return res
				.status(400)
				.json({ message: "Name and content are required" });
		}

		// Check if post exists
		const post = await prisma.post.findUnique({
			where: { id: Number(id) },
		});
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		const newComment = await prisma.comment.create({
			data: {
				title: title || "Otaku Comment",
				name,
				content,
				postId: Number(id),
			},
		});

		res.status(201).json(newComment);
	} catch (err) {
		console.error("Error adding comment:", err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get comments for a post (optional if you already include them in post)
router.get("/:id/comments", async (req, res) => {
	try {
		const { id } = req.params;
		const comments = await prisma.comment.findMany({
			where: { postId: Number(id) },
			orderBy: { createdAt: "desc" },
		});
		res.json(comments);
	} catch (err) {
		console.error("Error fetching comments:", err);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
