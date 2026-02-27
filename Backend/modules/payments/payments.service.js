const repo = require("./payments.repository");
const bookingsRepo = require("../bookings/bookings.repository");

function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

async function createPayment({ user, payload }) {
  const bookingId = payload?.bookingId;

  if (!bookingId) {
    throw httpError(400, "bookingId is required");
  }

  const booking = await bookingsRepo.getBookingById(bookingId);
  if (!booking) {
    throw httpError(404, "Booking not found");
  }

  if (booking.user_id !== user?.id) {
    throw httpError(403, "Forbidden");
  }

  if (booking.status !== "pending") {
    throw httpError(409, `Booking is not payable (status: ${booking.status})`);
  }

  return {
    ok: true,
    bookingId: booking.booking_id,
    totalPrice: booking.total_price,
    currency: booking.currency,
    checkoutUrl: null,
    note: "NOMOD session creation not implemented yet",
  };
}

async function getPaymentStatus({ user, paymentId }) {
  if (!paymentId) {
    throw httpError(400, "paymentId is required");
  }
  return repo.placeholder();
}

async function nomodWebhook({ headers, rawBody }) {
  if (!headers) {
    throw httpError(400, "headers is required");
  }

  if (typeof rawBody === "undefined") {
    throw httpError(400, "rawBody is required");
  }

  return { ok: true };
}

module.exports = {
  createPayment,
  getPaymentStatus,
  nomodWebhook,
};
