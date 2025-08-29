import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const logincontroller = async (req, res) => {
    try {
        const [name, password] = req.body;
    
        //check if email exists in database
        const user = await prisma.user.findUnique(
            {
                where: {
                    email
                }
            }
        )
        if (!user) {
            res.status(400).json({ error: "incorrect username or password" })
        }

        //compare the password written with that in the database
        const isvalid = await bcrypt.compare(password, user.password);
        if (!isvalid) return res.status(400).json({
            error: "incorrect username or password"
        });
        //send a success message alongside the user details
        res.json({
            message: "login successful,", user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            error: "server error; something went wrong"
        })
    }
}

export default logincontroller;