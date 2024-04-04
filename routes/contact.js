const express = require("express");

const contactController = require("../controllers/contactController");

const router = express.Router();


router.get("/contactus", contactController.getContact);

router.post("/success", contactController.postSuccess);

module.exports = router;