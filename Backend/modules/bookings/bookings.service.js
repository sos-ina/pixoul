const repo = require("./bookings.repository");

function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

async function create({ user, payload }) {
  const experienceId = payload?.experienceId;

  if (!experienceId) {
    throw httpError(400, "experienceId is required");
  }

  const productId = await repo.getExperienceProductId(experienceId);
  if (!productId) {
    throw httpError(404, "Experience not found or missing product mapping");
  }

  const priceRow = await repo.getActiveProductPrice(productId);
  if (!priceRow) {
    throw httpError(404, "No active price found for this experience");
  }

  const created = await repo.createBookingForExperience({
    userId: user?.id,
    experienceId,
    totalPrice: priceRow.price,
    currency: priceRow.currency,
    bookingSource: payload?.bookingSource,
  });

  return {
    ok: true,
    bookingId: created.booking_id,
    status: created.status,
    totalPrice: created.total_price,
    currency: created.currency,
    experienceId,
    productId,
  };
}

async function getMine({ user }) {
  if (!user?.id) {
    throw httpError(401, "Unauthorized");
  }

  const bookings = await repo.getBookingsByUserId(user.id);
  return { ok: true, bookings };
}

async function getById({ user, bookingId }) {
  if (!bookingId) {
    throw httpError(400, "bookingId is required");
  }

  const booking = await repo.getBookingById(bookingId);
  if (!booking) {
    throw httpError(404, "Booking not found");
  }

  if (booking.user_id !== user?.id) {
    throw httpError(403, "Forbidden");
  }

  return { ok: true, booking };
}

async function cancel({ user, bookingId }) {
  if (!bookingId) {
    throw httpError(400, "bookingId is required");
  }

  if (!user?.id) {
    throw httpError(401, "Unauthorized");
  }

  const booking = await repo.getBookingById(bookingId);
  if (!booking) {
    throw httpError(404, "Booking not found");
  }

  if (booking.user_id !== user.id) {
    throw httpError(403, "Forbidden");
  }

  if (booking.status !== "pending") {
    throw httpError(409, `Booking cannot be cancelled (status: ${booking.status})`);
  }

  const updated = await repo.updateBookingStatusForUser(bookingId, user.id, "cancelled");
  if (!updated) {
    throw httpError(500, "Failed to cancel booking");
  }

  return { ok: true, bookingId: updated.booking_id, status: updated.status };
}

module.exports = {
  create,
  getMine,
  getById,
  cancel,
};
