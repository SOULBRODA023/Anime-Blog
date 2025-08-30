import express from "express";

import logincontroller from "../controller/logincontroller.js";

const router = express.Router();

router.post("/", logincontroller);


export default router;