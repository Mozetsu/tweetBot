if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const TwitterLite = require('twitter-lite');
const auth = require('../config/auth');

const Twitter = new TwitterLite(auth);

const result = (err, data, response) => {
	if (err) return console.log({ err });
};

const tweet = (tweet) => Twitter.post('statuses/update', { status: tweet }, result);

module.exports = { tweet, result };
