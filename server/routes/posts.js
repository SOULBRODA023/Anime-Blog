// server/routes/posts.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import Auth from "../middleware/auth.js";

const prisma = new PrismaClient();
const router = express.Router();

// ================== POSTS ==================

// Get all posts
router.get("/", async (req, res) => {
	try {
		const posts = await prisma.post.findMany({
			where: { status: "PUBLISHED" }, // only published
			orderBy: { createdAt: "desc" },
		});
		res.json(posts);
	} catch (err) {
		console.error("Error fetching posts:", err);
		res.status(500).json({ message: "Server error" });
	}
});

// Get one post (with comments)
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const post = await prisma.post.findUnique({
			where: { id: Number(id) },
			include: { comments: { orderBy: { createdAt: "desc" } } }, // include comments
		});

		if (!post) return res.status(404).json({ message: "Post not found" });

		res.json(post);
	} catch (err) {
		console.error("Error fetching post:", err);
		res.status(500).json({ message: "Server error" });
	}
});

// Create a new post (protected)
router.post("/", Auth, async (req, res) => {
	try {
		const { title, content, status } = req.body;
		const userId = req.user.id; // decoded from token

		const newPost = await prisma.post.create({
			data: { title, content, status, authorId: userId },
		});

		res.status(201).json(newPost);
	} catch (err) {
		console.error("Error creating post:", err);
		res.status(500).json({ message: "Server error" });
	}
});

// Update a post
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
		console.error("Error updating post:", err);
		res.status(500).json({ message: "Server error" });
	}
});

// Delete a post
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.post.delete({ where: { id: Number(id) } });

		res.json({ message: "Post deleted successfully" });
	} catch (err) {
		console.error("Error deleting post:", err);
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

		// Ensure post exists
		const post = await prisma.post.findUnique({
			where: { id: Number(id) },
		});
		if (!post) return res.status(404).json({ message: "Post not found" });

		const newComment = await prisma.comment.create({
			data: {
				title: title || "Otaku Comment", // fallback fixed title
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

// Get comments for a post
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
