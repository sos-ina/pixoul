const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const authMiddleware = require("../../middlewares/authMiddleware");
const controller = require("./reviews.controller");

const router = express.Router();

router.get("/", asyncHandler(controller.list));

router.get("/me", authMiddleware, asyncHandler(controller.getMine));
router.post("/", authMiddleware, asyncHandler(controller.create));

module.exports = router;
