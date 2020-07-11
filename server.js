const express = require('express');
const app = express();
const databaseRoute = require('./routes/database');

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', databaseRoute);

app.listen(PORT, () => console.log(`// ${PORT}`));
