const { tweet, result } = require('./utils/twitter');
const fetch = require('node-fetch');
var fs = require('fs');

const interval = 1000 * 3600 * 3; // 3 hours

setInterval(tweetRandomFact, interval);

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
