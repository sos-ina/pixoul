const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const controller = require("./auth.controller");

const router = express.Router();

router.post("/signin", asyncHandler(controller.login));
router.post("/login", asyncHandler(controller.login));
router.post("/signup", asyncHandler(controller.register));
router.post("/register", asyncHandler(controller.register));
router.post("/forgot-password", asyncHandler(controller.forgotPassword));
router.post("/logout", asyncHandler(controller.logout));
router.get("/me", asyncHandler(controller.me));

module.exports = router;
