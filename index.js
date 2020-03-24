const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const { newTweet, replyTweet } = require('./utils/tweet');
const firebase = require('firebase/app');

const auth = require('firebase/auth');
const firestore = require('firebase/firestore');

const firebaseAuth = require('./config/FirebaseAuth');
firebase.initializeApp(firebaseAuth);

const PORT = 3000;
const authUsers = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', hbs());

app.set('view engine', 'handlebars');

const isAuthenticated = (req, res, next) => {
	// do any checks you want to in here
	// const { email } = req.body;
	// if (email) {
	// console.log(req.body);

	// const { user } = req.body;

	console.log(req);

	return next();

	// if (authUsers.find(user)) return next();
	// res.redirect('/apps');

	// CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
	// you can do this however you want with whatever variables you set up
	// if () return next();

	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	// res.redirect('/apps');
};

app.get('/', (req, res) => {
	res.render('login');
});

app.get('/register', (req, res) => {
	res.render('register');
});

// logged in routes
app.get('/apps', isAuthenticated, (req, res) => {
	res.render('apps', { username: 'Mozetsu' });
});

app.get('/tweet', (req, res) => {
	res.render('tweet', { username: 'Mozetsu' });
});

app.get('/reply', (req, res) => {
	res.render('reply', { username: 'Mozetsu' });
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

// users endpoints
app.post('/auth-users', (req, res) => {
	if (!authUsers.find(user => user === req.body.user)) authUsers.push(req.body.user);
	console.log(authUsers);
});

// users endpoints
app.post('/remove-users', (req, res) => {
	if (authUsers.indexOf(req.body.user) > -1) authUsers.splice(authUsers.indexOf(req.body.user), 1);
	console.log(authUsers);
});
