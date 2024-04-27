const express = require("express");

const messageController = require("../controllers/messages");

const router = express.Router();

router.get("/", messageController.getMessages);

router.post("/", messageController.postMessages);

router.get("/all", messageController.getAllMessages);

module.exports = router;