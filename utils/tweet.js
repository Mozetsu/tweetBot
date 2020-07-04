// if (process.env.NODE_ENV !== 'production')
require('dotenv').config();
const Twitter = require('twitter-lite');
const auth = require('../config/tokens');

// API auth
const T = new Twitter(auth);

const result = (error, data, response) => {
	if (error) return console.log({ error });
	console.log('Success!');
};

const search = (username) => T.get('users/show', { screen_name: username }, result);

const fetchUser = async (usr) => {
	const user = await search(usr);
	console.log(user);
};
// fetchUser('Mozetsu');

const tweet = (tweet) => T.post('statuses/update', { status: tweet }, result);

const retweet = (id) => T.post(`statuses/retweet/${id}`, result);
const favorite = (id) => T.post(`favorites/create`, { id }, result);

const reply = (id, reply) => {
	T.post('statuses/update', { in_reply_to_status_id: id, auto_populate_reply_metadata: true, status: reply }, result);
};

// T.stream('statuses/filter', { track: 'javascript' }, (stream) => {
// 	stream.on('data', (tweet) => console.log(tweet));
// 	stream.on('error', (error) => console.log(error));
// });
