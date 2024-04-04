const express = require("express");
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'login.html'));
});

module.exports = router;