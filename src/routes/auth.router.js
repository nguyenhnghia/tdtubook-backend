const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const asyncHandler = require("../utils/asyncHandler");

// @route POST /auth
// @desc show hello world
// @access public
router.route("/").get(asyncHandler(authController.hello));

module.exports = router;
