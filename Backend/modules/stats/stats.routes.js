const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const authMiddleware = require("../../middlewares/authMiddleware");
const controller = require("./stats.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/me", asyncHandler(controller.getMine));

module.exports = router;
