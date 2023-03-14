// User Signin And Login router file .//

import express from "express";

import { signup, signIn } from "../controller/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signIn);

export default router;
