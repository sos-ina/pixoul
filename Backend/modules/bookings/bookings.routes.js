const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const authMiddleware = require("../../middlewares/authMiddleware");
const controller = require("./bookings.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", asyncHandler(controller.create));
router.get("/me", asyncHandler(controller.getMine));
router.get("/:bookingId", asyncHandler(controller.getById));
router.post("/:bookingId/cancel", asyncHandler(controller.cancel));

module.exports = router;
