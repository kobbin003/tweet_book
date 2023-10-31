import { ElementHandle, Page } from "puppeteer";

export const loginUsername = async (page: Page, username: string) => {
	const usernameClassname =
		"r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu";
	const usernameInputXpath = `//input[@class='${usernameClassname}']`;
	const classArray = usernameClassname.split(" ");
	classArray.unshift("input");
	const usernameSelector = classArray.join(".");

	try {
		// wait till the desired element is loaded in the screen
		await page.waitForXPath(usernameInputXpath);
		// select the username input
		const usernameInput = await page.$x(usernameInputXpath);
		if (usernameInput.length > 0) {
			// focus on the username input
			await usernameInput[0].focus();

			// enter the username in the username input

			await page.keyboard.type(username, { delay: 100 });

			// select the next button to go to password page
			const nextButton = await page.$x(
				'//div[@role="button"]//span[text()="Next"]'
			);
			if (nextButton.length > 0) {
				// click the next button
				await (nextButton[0] as ElementHandle<Element>).click();
			}
		}
	} catch (error) {
		console.log(error);
	}
};
