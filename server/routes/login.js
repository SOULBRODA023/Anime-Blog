import express from "express";
import { PrismaClient } from "@prisma/client";
import logincontroller from "../controller/logincontroller";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", logincontroller);