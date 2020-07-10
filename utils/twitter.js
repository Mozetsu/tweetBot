if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const Twitter = require('twitter-lite');
const auth = require('../config/auth');

// API auth
const Twitter = new Twitter(auth);

const tweet = (tweet) => Twitter.post('statuses/update', { status: tweet }, result);

const retweet = (id) => Twitter.post(`statuses/retweet/${id}`, result);

const favorite = (id) => Twitter.post(`favorites/create`, { id }, result);

const reply = (id, reply) => {
	Twitter.post(
		'statuses/update',
		{ in_reply_to_status_id: id, auto_populate_reply_metadata: true, status: reply },
		result
	);
};

const result = (err, data, response) => {
	if (err) return console.log({ err });
};

const search = (username) => Twitter.get('users/show', { screen_name: username }, result);

const fetchUser = async (usr) => {
	const user = await search(usr);
	console.log(user);
};

// Twitter.stream('statuses/filter', { track: 'javascript' }, (stream) => {
// 	stream.on('data', (tweet) => console.log(tweet));
// 	stream.on('error', (error) => console.log(error));
// });

module.exports = { tweet };
