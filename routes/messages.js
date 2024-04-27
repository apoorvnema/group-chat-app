const express = require("express");

const messageController = require("../controllers/messages");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.get("/", messageController.getMessages);

router.post("/", authenticate, messageController.postMessages);

router.get("/all", authenticate, messageController.getAllMessages);

module.exports = router;