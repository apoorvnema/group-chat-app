const express = require("express");

const messageController = require("../controllers/messageController");

const router = express.Router();
router.use(express.json());

router.get('/', messageController.getMessages);

router.post('/', messageController.postMessages);

module.exports = router;