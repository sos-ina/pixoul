const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const authMiddleware = require("../../middlewares/authMiddleware");
const controller = require("./payments.controller");

const router = express.Router();

// Webhooks (no auth)
router.post("/webhook/nomod", asyncHandler(controller.nomodWebhook));

// Protected routes
router.use(authMiddleware);

router.post("/create", asyncHandler(controller.createPayment));
router.get("/:paymentId", asyncHandler(controller.getPaymentStatus));

module.exports = router;
