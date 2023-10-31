import { Page } from "puppeteer";
import { TweetContent } from "../types/tweetContent";

export const getTweetContent = async (page: Page, username: string) => {
	const tweetContent: TweetContent = {
		user: { profileImageUrl: "", twitterName: "", username },
		tweet: { text: "", linkedPhoto: [] },
		linkedTweet: {
			user: { profileImageUrl: "", twitterName: "", username },
			tweet: { text: "", linkedPhotos: [] },
		},
	};

	const tweetXPath = '//article[@data-testid="tweet"]';

	await page.waitForXPath(tweetXPath);

	const tweetProfilePicDivXPath =
		'//article[@data-testid="tweet"]/div/div/div[2]/div[1]';
	const tweetNamesDivXPath =
		'//article[@data-testid="tweet"]/div/div/div[2]/div[2]/div[1]';
	const tweetTextDivXPath =
		'//article[@data-testid="tweet"]/div/div/div[3]/div[1]';
	const tweetImgDivXpath =
		'//article[@data-testid="tweet"]/div/div/div[3]/div[2]/div/div[1]';
	const tweetLinkedDivXpath =
		'//article[@data-testid="tweet"]/div/div/div[3]/div[2]/div/div[2]';

	/* ----------------------------------- tweet div ---------------------------------- */
	const tweetDivs = await page.$x(tweetXPath);
	if (tweetDivs.length > 0) {
		// console.log("got tweet div");
		// const statusDiv = tweetDivs[0];
		/* ------------------------------ profile Image ----------------------------- */
		const profileImageDivs = await page.$x(tweetProfilePicDivXPath);
		if (profileImageDivs.length > 0) {
			const profileImage = await profileImageDivs[0].$$(
				`div[data-testid="UserAvatar-Container-${username}"] img`
			);
			if (profileImage.length > 0) {
				// console.log("got tweet div image");

				const src = await profileImage[0].getProperty("src");
				const image = await src.jsonValue();
				// console.log("image", image);
				//*
				tweetContent.user.profileImageUrl = image;
			}
		}
		/* ------------------------------- full name ------------------------------- */
		const namesDivs = await page.$x(tweetNamesDivXPath);
		if (namesDivs.length > 0) {
			const fullNames = await namesDivs[0].$$(
				'div[data-testid="User-Name"] div span > span'
			);
			if (fullNames.length > 0) {
				const fullNameStatus = await page.evaluate(
					(el) => el.textContent,
					fullNames[0]
				);
				//*
				tweetContent.user.twitterName = fullNameStatus;
				// console.log("fullNameStatus", fullNameStatus);
			}
		}

		/* ------------------------------- tweet text ------------------------------- */
		const tweetDivs = await page.$x(tweetTextDivXPath);
		if (tweetDivs.length > 0) {
			const tweets = await tweetDivs[0].$$('div[data-testid="tweetText"]');
			if (tweets.length > 0) {
				const mainTweet = tweets[0];
				const statusText = await page.evaluate((el) => {
					return el.textContent;
				}, mainTweet);
				//*
				tweetContent.tweet.text = statusText;
				// console.log("tweetText", statusText);
			}
		}

		/* ------------------------------- tweet photo ------------------------------ */
		const tweetImageDivs = await page.$x(tweetImgDivXpath);
		if (tweetImageDivs.length > 0) {
			// const tweetPhotos = await tweetImageDivs[0].$$("img");
			const tweetPhotos = await tweetImageDivs[0].$$(
				"div[data-testid='tweetPhoto'] img"
			);
			if (tweetPhotos.length > 0) {
				const photos = tweetPhotos.map(async (photo, index) => {
					const tweetPhoto = await photo.getProperty("src");
					const src = await tweetPhoto.jsonValue();
					// console.log(`tweet photo-${index}`, src);
					return src;
				});
				//*
				tweetContent.tweet.linkedPhoto = await Promise.all(photos);
			}
		}

		/* ----------------------- linked tweet ----------------------- */
		const linkedTweetDiv = await page.$x(tweetLinkedDivXpath);
		if (linkedTweetDiv.length > 0) {
			/* ----------------------- linked tweet profile image ----------------------- */
			const profileImageLinkTweet = await linkedTweetDiv[0].$$(
				`div[data-testid="Tweet-User-Avatar"] img`
			);
			if (profileImageLinkTweet.length > 0) {
				// console.log("got linked tweet div image");

				const src = await profileImageLinkTweet[0].getProperty("src");
				//* profileImageLinkTweet[1] -> you will get the profile image of the main tweet
				const image = await src.jsonValue();
				//*
				tweetContent.linkedTweet.user.profileImageUrl = image;
				// console.log("linkedtweetProfileImage", image);
			}
			/* -------------------------- linked tweet username ------------------------- */

			const usernames = await linkedTweetDiv[0].$$(
				'div[data-testid="User-Name"] > div:nth-of-type(2) span'
			);
			// console.log("allNames", allNames);
			if (usernames.length > 0) {
				const usernameLinkedTweet = await page.evaluate(
					(el) => el.textContent,
					usernames[0]
				);
				//*
				tweetContent.linkedTweet.user.username = usernameLinkedTweet;
				// console.log(`usernameLinkedTweet`, usernameLinkedTweet);
			}

			// /* ------------------------------- linked tweet full name ------------------------------- */
			const fullNames = await linkedTweetDiv[0].$$(
				'div[data-testid="User-Name"] div:nth-of-type(1) span > span'
			);
			if (fullNames.length > 0) {
				const fullNameStatus = await page.evaluate(
					(el) => el.textContent,
					fullNames[0]
				);
				//*
				tweetContent.linkedTweet.user.twitterName = fullNameStatus;
				// console.log("linkedfullNameStatus", fullNameStatus);
			}
			/* ---------------------------- linked tweet text --------------------------- */
			const linkedTweets = await linkedTweetDiv[0].$$(
				'div[data-testid="tweetText"]'
			);
			if (linkedTweets.length > 0) {
				// console.log("got linked tweet text");
				const linkedTweet = linkedTweets[0];
				const linkedTweetText = await page.evaluate((el) => {
					return el.textContent;
				}, linkedTweet);
				//*
				tweetContent.linkedTweet.tweet.text = linkedTweetText;
				// console.log("linked tweet text", linkedTweetText);
			}
			/* --------------------------- linked tweet photos --------------------------- */
			const linkedTweetPhotos = await linkedTweetDiv[0].$$(
				"div[data-testid='tweetPhoto'] img"
			);
			if (linkedTweetPhotos.length > 0) {
				const photos = linkedTweetPhotos.map(async (photo, index) => {
					const tweetPhoto = await photo.getProperty("src");
					const src = await tweetPhoto.jsonValue();
					// console.log(`linked tweet photo-${index}`, src);
					return src;
				});
				//*
				tweetContent.linkedTweet.tweet.linkedPhotos = await Promise.all(photos);
			}
		} else {
			console.log("there is no linked tweet");
		}
	}

	return tweetContent;
};
