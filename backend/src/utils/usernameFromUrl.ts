export const usernameFromUrl = (url: string) => {
	const splitUrl = url.split("/");
	const indexOfTwitterDotCom = splitUrl.findIndex(
		(str) => str == "twitter.com"
	);
	const username = splitUrl[indexOfTwitterDotCom + 1];
	return username;
};
