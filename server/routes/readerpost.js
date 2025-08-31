router.get("/", async (req, res) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				status: "PUBLISHED", // only published posts
			},
			orderBy: {
				createdAt: "desc", // latest first
			},
		});

		res.json(posts);
	} catch (err) {
		console.error("Error fetching posts:", err);
		res.status(500).json({ message: "Server error" });
	}
});
