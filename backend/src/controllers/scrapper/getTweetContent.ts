import { Request, Response } from "express";
import { page } from "../../scrapper/loginXAccount";
import { navigateTo } from "../../scrapper/navigateTo";
import { usernameFromUrl } from "../../utils/usernameFromUrl";
import { getTweetContent } from "../../scrapper/getTweetContent";

export const getTweet = async (req: Request, res: Response) => {
	const tweetId = req.query.id;
	try {
		// go to a specific status
		const url = `https://twitter.com/kkob03/status/${tweetId}`;
		await navigateTo(page, url);

		// get the tweets content
		const tweetUsername = usernameFromUrl(url);
		const tweetContent = await getTweetContent(page, tweetUsername);
		// const id = req.query.id;
		res.json({ tweetContent });
	} catch (error) {
		res.status(500).json({ msg: "server error" });
	}
};
