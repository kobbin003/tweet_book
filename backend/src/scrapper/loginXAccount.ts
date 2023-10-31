import puppeteer, { Browser, Page } from "puppeteer";
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
		const loginUrl = process.env.LOGIN_URL;
		await page.goto(loginUrl, { waitUntil: "networkidle2" });

		const username = process.env.USERNAMETWEET;
		const password = process.env.PASSWORDTWEET;

		await loginUsername(page, username);
		await loginPassword(page, password);
	} catch (error) {
		console.log(error);
	}
};
