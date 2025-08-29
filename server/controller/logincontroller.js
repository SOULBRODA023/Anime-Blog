import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const login = (req, res) => {
    const [name, password]= req.body
}