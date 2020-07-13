const express = require('express');
const app = express();
const path = require('path');
const tweetBot = require('./utils/tweetBot');

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tweetRandomFact', (req, res) => {
	tweetBot.tweetRandomFact();
	res.status(200).send({ server: 'tweeted!' });
});

app.get('/database', (req, res) => {
	res.sendFile(path.join(__dirname + '/../utils/database.json'));
});

app.listen(PORT, () => console.log(`// ${PORT}`));
