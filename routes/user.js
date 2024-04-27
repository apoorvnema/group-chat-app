const express = require("express");

const userController = require("../controllers/user");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.get("/signup", userController.getSignup);

router.post("/signup", userController.postSignup);

router.get("/login", userController.getLogin);

router.post("/login", userController.postLogin);

router.get("/online-users", authenticate, userController.getOnlineUsers);

module.exports = router;