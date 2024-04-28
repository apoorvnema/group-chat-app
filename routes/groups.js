const express = require("express");

const groupController = require("../controllers/groups");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.get("/", groupController.getGroupList);

router.get("/get-all-groups", authenticate, groupController.getAllGroups);

router.get("/group/:groupId", groupController.getGroupPage);

router.get("/get-all-messages/:groupId", authenticate, groupController.getGroupMessages);

router.get("/get-all-members/:groupId", authenticate, groupController.getGroupMembers);

router.post("/send-group-message/:groupId", authenticate, groupController.sendGroupMessage);

router.post("/create-group", authenticate, groupController.createGroup);

module.exports = router;