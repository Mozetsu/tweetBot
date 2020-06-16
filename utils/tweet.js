const Twit = require('twit');
const auth = require('../config/GhownAuth');

// API auth
const T = new Twit(auth);

// callback
const tweeted = (err, data, response) => {
	if (err) console.log('Something went wrong!', err);
	else console.log('Completed!');
};

// make tweets
const newTweet = (tweet) => {
	T.post('statuses/update', { status: tweet }, tweeted);
};

// reply to tweets
const replyTweet = (tweetID, username, reply) => {
	T.post('statuses/update', { in_reply_to_status_id: tweetID, status: `@${username} ${reply}` }, tweeted);
};

module.exports = {
	newTweet,
	replyTweet,
};
