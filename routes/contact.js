const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../util/path");

router.get("/contactus", (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
});

router.post("/success", (req, res) => {
    console.log(req.body);
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
});

module.exports = router;