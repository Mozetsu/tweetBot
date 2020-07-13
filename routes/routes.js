const express = require('express');
const router = express.Router();
const path = require('path');
const { tweetRandomFact } = require('./utils/tweetBot');

router.get('/tweetRandomFact', (req, res) => {
	tweetRandomFact();
	res.status(200).send({ server: 'tweeted!' });
});

router.get('/database', (req, res) => {
	res.sendFile(path.join(__dirname + '/../utils/database.json'));
});

module.exports = router;
