import { ElementHandle, Page } from "puppeteer";

export const loginPassword = async (page: Page, password: string) => {
	const passwordClassname =
		"r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu";

	const passwordInputXpath = `//input[@class='${passwordClassname}' and @type='password']`;
	try {
		// wait till the desired element is loaded in the screen
		await page.waitForXPath(passwordInputXpath);

		// select the password input
		const passwordInput = await page.$x(passwordInputXpath);
		if (passwordInput.length > 0) {
			console.log("pass-input");
			// focus on the password input
			await passwordInput[0].focus();

			// enter the password in the username input
			await page.keyboard.type(password, { delay: 100 });

			// select the login button to go to password page
			const loginButton = await page.$x(
				'//div[@data-testid="LoginForm_Login_Button"]'
			);

			if (loginButton.length > 0) {
				console.log("login-button");
				// click the login button
				await (loginButton[0] as ElementHandle<Element>).click();
			}
		}
	} catch (error) {}
};
