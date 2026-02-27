const { supabaseAdmin } = require("../../config/supabaseClient");

async function placeholder() {
  return { ok: true };
}

async function getExperienceProductId(experienceId) {
  const { data, error } = await supabaseAdmin
    .from("experiences")
    .select("product_id")
    .eq("experience_id", experienceId)
    .maybeSingle();

  if (error) throw error;
  return data?.product_id || null;
}

async function getActiveProductPrice(productId, nowIso) {
  const now = nowIso || new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("product_prices")
    .select("price_id, product_id, price, currency, valid_from, valid_to")
    .eq("product_id", productId)
    .lte("valid_from", now)
    .or(`valid_to.is.null,valid_to.gt.${now}`)
    .order("valid_from", { ascending: false })
    .order("price_id", { ascending: false })
    .limit(1);

  if (error) throw error;
  return data?.[0] || null;
}

async function createBookingForExperience({
  userId,
  experienceId,
  totalPrice,
  currency,
  bookingSource,
}) {
  const insertPayload = {
    user_id: userId,
    experience_id: experienceId,
    booking_type: "registered_user",
    booking_source: bookingSource || null,
    total_price: totalPrice,
    currency,
    status: "pending",
  };

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert(insertPayload)
    .select("booking_id, total_price, currency, status")
    .single();

  if (error) throw error;
  return data;
}

async function getBookingById(bookingId) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .eq("booking_id", bookingId)
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

async function getBookingsByUserId(userId) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("booking_date", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function updateBookingStatusForUser(bookingId, userId, status) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("booking_id", bookingId)
    .eq("user_id", userId)
    .select("booking_id, status")
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

async function updateBookingStatus(bookingId, status) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("booking_id", bookingId)
    .select("booking_id, status")
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

module.exports = {
  placeholder,
  getExperienceProductId,
  getActiveProductPrice,
  createBookingForExperience,
  getBookingById,
  getBookingsByUserId,
  updateBookingStatusForUser,
  updateBookingStatus,
};
