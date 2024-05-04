const express = require("express");

const groupController = require("../controllers/groups");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.delete("/delete-group/:groupId", authenticate, groupController.deleteGroup);

router.put("/edit-group/:groupId", authenticate, groupController.editGroup);

router.delete("/delete-member/:groupId/:userId", authenticate, groupController.deleteMember);

router.put("/make-admin/:groupId/:userId", authenticate, groupController.makeAdmin);

module.exports = router;