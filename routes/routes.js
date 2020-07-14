const express = require('express');
const router = express.Router();
const path = require('path');
const tweetBot = require('../utils/tweetBot');

router.get('/randomFact', (req, res) => {
	tweetBot.randomFact();
	res.status(200).send({ fact: 'tweeted!' });
});

router.get('/mostPlayedTrack', (req, res) => {
	tweetBot.mostPlayedTrack();
	res.status(200).send({ track: 'tweeted!' });
});

router.get('/database', (req, res) => {
	res.sendFile(path.join(__dirname + '/../utils/database.json'));
});

module.exports = router;
