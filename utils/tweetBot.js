if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const TwitterLite = require('twitter-lite');
const auth = require('../config/auth');
const { scrapeSpotify } = require('./spotify');

const Twitter = new TwitterLite(auth);

const result = (err, data, response) => {
	if (err) return console.log({ err });
};

const tweet = (tweet) => Twitter.post('statuses/update', { status: tweet }, result);

async function randomFact() {
	try {
		// parse json file into a variable
		const database = JSON.parse(fs.readFileSync('./utils/database.json'));

		// fetch random fact
		const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
		const { id, text } = await response.json();

		// if fact already tweeted, get new one
		if (database.ids.includes(id)) return randomFact();

		// save fact id on json file
		database.ids.push(id);
		await fs.writeFile('./utils/database.json', JSON.stringify(database), result);

		// tweet
		await tweet(text);
	} catch (err) {
		console.log(err);
	}
}

async function mostPlayedTrack() {
	try {
		// get tracks
		const mostPlayedTracks = await scrapeSpotify();

		// get date
		const date = new Date();
		const parsedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

		// parse information to tweet
		const data = `Spotify - Top 5 (${parsedDate})

									${mostPlayedTracks[0].position} - ${mostPlayedTracks[0].track}, ${mostPlayedTracks[0].author}

									${mostPlayedTracks[1].position} - ${mostPlayedTracks[1].track}, ${mostPlayedTracks[1].author}

									${mostPlayedTracks[2].position} - ${mostPlayedTracks[2].track}, ${mostPlayedTracks[2].author}

									${mostPlayedTracks[3].position} - ${mostPlayedTracks[3].track}, ${mostPlayedTracks[3].author}

									${mostPlayedTracks[4].position} - ${mostPlayedTracks[4].track}, ${mostPlayedTracks[4].author}
									`;

		// tweet
		await tweet(data);
	} catch (err) {
		console.log(err);
	}
}

exports.randomFact = randomFact;
exports.mostPlayedTrack = mostPlayedTrack;
