const { tweetRandomFact } = require('./utils/twitter');
const express = require('express');
const app = express();
const databaseRoute = require('./routes/database');
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', databaseRoute);

// const interval = 1000 * 3600 * 3; // 3 Hours
// setInterval(() => tweetRandomFact(), interval);
tweetRandomFact();

app.listen(PORT, () => console.log(`// ${PORT}`));
