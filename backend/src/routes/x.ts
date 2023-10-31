import express from "express";
import { loginXAccount, page } from "../scrapper/loginXAccount";
import { navigateTo } from "../scrapper/navigateTo";
import { usernameFromUrl } from "../utils/usernameFromUrl";
import { getTweetContent } from "../scrapper/getTweetContent";
import { getTweet } from "../controllers/scrapper/getTweetContent";

const router = express.Router();
router.get("/", (req, res) => {
	res.json({ msg: "success" });
});

router.get("/tweet", getTweet);

export { router as xRouter };
