if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const TwitterLite = require('twitter-lite');
const auth = require('../config/auth');

const Twitter = new TwitterLite(auth);

const result = (err, data, response) => {
	if (err) return console.log({ err });
};

const tweet = (tweet) => Twitter.post('statuses/update', { status: tweet }, result);

async function tweetRandomFact() {
	try {
		// parse json file into a variable
		const database = JSON.parse(fs.readFileSync('./utils/database.json'));

		// fetch random fact
		const response = await fetch('https://uselessfacts.jsph.pl//random.json?language=en');
		const { id, text } = await response.json();

		// if fact already tweeted, get new one
		if (database.ids.includes(id)) return tweetRandomFact();

		// save fact id on json file
		database.ids.push(id);
		await fs.writeFile('./utils/database.json', JSON.stringify(database), result);

		// tweet
		await tweet(text);
	} catch (err) {
		console.log(err);
	}
}

module.exports = { tweetRandomFact };
