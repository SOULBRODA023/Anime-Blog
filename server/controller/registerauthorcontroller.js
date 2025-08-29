import bcrypt from "bcryptjs"; 
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();


const registerAuthor = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Encrypt password
        const hashPassword = await bcrypt.hash(password, 12);

        // Add a new author
        const newAuthor = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword, 
            }
        });

        console.log("User added:", newAuthor.email);
        res.status(201).json({ message: "You are welcome", newAuthor });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error, something went wrong" });
    }
};

export default registerAuthor;
