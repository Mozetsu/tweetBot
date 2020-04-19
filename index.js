const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const { newTweet, replyTweet } = require('./utils/tweet');

const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('home', { username: 'Mozetsu' });
});

// tweet endpoints
app.get('/make-tweet', (req, res) => {
	// checks for missing values
	if (!req.query.tweet) return res.send({ error: `Looks like there's no tweet` });

	const { tweet } = req.query;

	newTweet(tweet);
	res.send({ tweet });
});

app.get('/reply-tweet', (req, res) => {
	// checks for missing values
	if (!req.query.tweetID || !req.query.username || !req.query.tweet)
		return res.send({ error: 'Some fields are missing' });

	// get all the values
	const { tweetID, username, tweet } = req.query;

	replyTweet(tweetID, username, tweet);
	res.send({ tweetID, username, tweet });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
