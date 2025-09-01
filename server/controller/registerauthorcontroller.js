// server/controller/registerauthorcontroller.js
import bcrypt from "bcryptjs";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

const registerAuthor = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// ✅ Validate inputs
		if (!username || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// ✅ Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// ✅ Hash password
		const hashPassword = await bcrypt.hash(password, 12);

		// ✅ Save new user (map username → name)
		const newAuthor = await prisma.user.create({
			data: {
				name: username, // maps frontend username → db field name
				email,
				password: hashPassword,
			},
		});

		console.log("✅ User registered:", newAuthor.email);

		return res.status(201).json({
			message: "You are welcome",
			user: {
				id: newAuthor.id,
				name: newAuthor.name,
				email: newAuthor.email,
				role: newAuthor.role,
			},
		});
	} catch (err) {
		console.error("❌ Register error:", err);
		return res
			.status(500)
			.json({ message: "Server error, something went wrong" });
	}
};

export default registerAuthor;
