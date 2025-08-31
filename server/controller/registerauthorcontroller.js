import bcrypt from "bcryptjs";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

const registerAuthor = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// Check if user already exists
		const existingUser = await prisma.user.findFirst({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Encrypt password
		const hashPassword = await bcrypt.hash(password, 12);

		// Add a new author
		const newAuthor = await prisma.user.create({
			data: {
				name:username,
				email,
				password: hashPassword,
			},
		});

		console.log("User added:", newAuthor.email);
		return res
			.status(201)
			.json({ message: "You are welcome", user: newAuthor });
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ message: "Server error, something went wrong" });
	}
};

export default registerAuthor;
