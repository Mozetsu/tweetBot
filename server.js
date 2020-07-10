const { tweetRandomFact } = require('./utils/twitter');
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const interval = 1000 * 30; // 3 hours

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/utils/database.json`);
});

// setInterval(tweetRandomFact, interval);

app.listen(PORT, () => console.log(`// ${PORT}`));
