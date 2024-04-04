const express = require("express");
const fs = require("fs");
const path = require('path');

const router = express.Router();
router.use(express.json());
const rootDir = require('../util/path');

router.get('/', (req, res) => {
    let message;
    try {
        message = fs.readFileSync('message.txt', 'utf-8');
    }
    catch (err) {
        message = "No messages found!"
    }
    res.sendFile(path.join(rootDir, 'views', 'message.html'));
});

router.post('/', (req, res) => {
    const message = req.body.message + '\n';
    fs.appendFileSync('message.txt', message);
    res.redirect('/');
})

module.exports = router;