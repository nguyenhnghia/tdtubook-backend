const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");

router.route("/login").post(asyncHandler(authController.loginWithUsernamePassword));
router.route("/register").post(asyncHandler(authController.register));

module.exports = router;
