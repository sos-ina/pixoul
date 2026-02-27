const { supabaseAdmin } = require("../../config/supabaseClient");

async function getAppUserByAuthId(authId) {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("user_id, email")
    .eq("auth_id", authId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function updateUserProfile(userId, patch) {
  const { data, error } = await supabaseAdmin
    .from("user_profiles")
    .update(patch)
    .eq("user_id", userId)
    .select("user_id, username, display_name, country, date_of_birth, bio, avatar_url")
    .maybeSingle();

  if (error) throw error;
  return data;
}

module.exports = {
  getAppUserByAuthId,
  updateUserProfile,
};
