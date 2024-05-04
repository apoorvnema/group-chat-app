const express = require("express");

const contactController = require("../controllers/contact");

const router = express.Router();

router.post("/contactus", contactController.postContact);

module.exports = router;