const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const bookingsRoutes = require("../modules/bookings/bookings.routes");
const paymentsRoutes = require("../modules/payments/payments.routes");
const invoicesRoutes = require("../modules/invoices/invoices.routes");
const profileRoutes = require("../modules/profile/profile.routes");
const statsRoutes = require("../modules/stats/stats.routes");
const chatRoutes = require("../modules/chat/chat.routes");
const reviewsRoutes = require("../modules/reviews/reviews.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/stats", statsRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/bookings", bookingsRoutes);
router.use("/payments", paymentsRoutes);
router.use("/invoices", invoicesRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
