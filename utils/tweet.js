require('dotenv').config();
const Twitter = require('twitter');
const auth = require('../config/tokens');

// API auth
const T = new Twitter(auth);

const result = (error, data, response) => {
	if (error) return console.log({ error });
	console.log('Success!');
};

const tweet = (tweet) => T.post('statuses/update', { status: tweet }, result);

const reply = (id, reply) => {
	T.post('statuses/update', { in_reply_to_status_id: id, auto_populate_reply_metadata: true, status: reply }, result);
};

reply('1273312848022831104', "forgot the -D flag");
