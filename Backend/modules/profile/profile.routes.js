const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const authMiddleware = require("../../middlewares/authMiddleware");
const controller = require("./profile.controller");

const router = express.Router();

router.use(authMiddleware);

router.put("/update", asyncHandler(controller.update));
router.post("/upload-avatar", asyncHandler(controller.uploadAvatar));
router.post("/upload-avatar-file", asyncHandler(controller.uploadAvatarFile));

module.exports = router;
