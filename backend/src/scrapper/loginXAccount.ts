import puppeteer, { Browser, Page } from "puppeteer";
import { LOGIN_URL } from "../constants/constants";
import { loginUsername } from "./loginUsername";
import { loginPassword } from "./loginPassword";
import "dotenv/config";
export let page: Page;

export const loginXAccount = async () => {
	try {
		const browser: Browser = await puppeteer.launch({
			headless: true,
		});

		page = await browser.newPage();

		await page.goto(LOGIN_URL, { waitUntil: "networkidle2" });

		const username = process.env.USERNAMETWEET;
		const password = process.env.PASSWORDTWEET;

		await loginUsername(page, username);
		await loginPassword(page, password);
	} catch (error) {
		console.log(error);
	}
};
