import { Page } from "puppeteer";

export const navigateTo = async (page: Page, URL: string) => {
	await page.goto(URL, { waitUntil: "networkidle2" });
};
