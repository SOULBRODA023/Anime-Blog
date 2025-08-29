// import express from "express";
// const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs"

const registerAuthor = async (req, res) => {
    try {
        const [name, email, password] = req.body;
        
        //encrypyt password using bcrypt.js
        const hashPassword = await bcrypt.hash(password, 12);

        //check if user already exists by email
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (existingUser) {
            res.status(400).json({ error: "user already exists" })
        }

        //add a new author
        const newAuthor = await prisma.user.create({
            data: {
                name,
                email,
                hashPassword
            }
        });
        res.status(201).json({ message: `You are welcome`, newAuthor });
          console.log("user added")
    }
    catch(err) {
        console.error(err)
        res.status(500).json({error:  `Server error, something went wrong`})
    };
  
}

export default registerAuthor;