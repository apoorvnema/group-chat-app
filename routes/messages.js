const express = require("express");

const messageController = require("../controllers/messageController");

const router = express.Router();

router.get("/", messageController.getMessages);

router.post("/", messageController.postMessages);

router.get("/all", messageController.getAllMessages);

module.exports = router;