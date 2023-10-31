export type TweetContent = {
	user: { profileImageUrl: string; twitterName: string; username: string };
	tweet: { text: string; linkedPhoto: string[] };
	linkedTweet: {
		user: { profileImageUrl: string; twitterName: string; username: string };
		tweet: { text: string; linkedPhotos: string[] };
	};
};
