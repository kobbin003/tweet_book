import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { randomUUID } from "crypto";
import { registerUser } from "../controllers/user/registerUser";
import { User } from "../types/User";
import { loginUser } from "../controllers/user/loginUser";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post(
	"/checkAuth",
	passport.authenticate("jwt", { session: false }),
	function (req, res) {
		res.send(req.user);
	}
);

export { router as authRouter };
