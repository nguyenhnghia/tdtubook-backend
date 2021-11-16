const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/authController");

// @route POST /auth
// @desc show hello world
// @access public
router.get("/", AuthController.Hello);

module.exports = router;
