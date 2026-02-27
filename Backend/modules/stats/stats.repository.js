const { supabaseAdmin } = require("../../config/supabaseClient");

async function listBookingsForLeaderboard({ limit = 10000 } = {}) {
  const { data, error } = await supabaseAdmin.from("bookings").select("user_id").limit(limit);
  if (error) throw error;
  return data || [];
}

async function getBookingsForUser(userId) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("booking_id, experience_id, status")
    .eq("user_id", userId);

  if (error) throw error;
  return data || [];
}

module.exports = {
  listBookingsForLeaderboard,
  getBookingsForUser,
};
