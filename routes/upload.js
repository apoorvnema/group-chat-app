const express = require("express");
const multer = require("multer");

const upload = multer();

const authenticate = require("../middlewares/auth");
const uploadController = require("../controllers/upload");

const router = express.Router();

router.post('/upload-image', authenticate,upload.single('image'), uploadController.uploadImage);

module.exports = router;