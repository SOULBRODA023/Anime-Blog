import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import registerAuthor from "../controller/registerauthorcontroller";

router.get("/", registerAuthor);