const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const authMiddleware = require("../../middlewares/authMiddleware");
const controller = require("./invoices.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncHandler(controller.list));
router.get("/:invoiceId", asyncHandler(controller.getById));

module.exports = router;
