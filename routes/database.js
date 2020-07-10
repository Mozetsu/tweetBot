const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/database', (req, res) => {
	res.sendFile(path.join(__dirname + '/../utils/database.json'));
});

module.exports = router;
