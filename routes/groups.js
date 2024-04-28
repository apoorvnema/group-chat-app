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

router.delete("/delete-group/:groupId", authenticate, groupController.deleteGroup);

router.put("/edit-group/:groupId", authenticate, groupController.editGroup);

router.delete("/delete-member/:groupId/:userId", authenticate, groupController.deleteMember);

router.put("/make-admin/:groupId/:userId", authenticate, groupController.makeAdmin);

module.exports = router;