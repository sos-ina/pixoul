const { supabaseAdmin } = require("../../config/supabaseClient");

async function attachProfiles(rows) {
  const reviews = Array.isArray(rows) ? rows : [];
  const userIds = Array.from(new Set(reviews.map((r) => r?.user_id).filter(Boolean)));
  if (!userIds.length) return reviews;

  const { data, error } = await supabaseAdmin
    .from("user_profiles")
    .select("user_id, username, display_name, avatar_url")
    .in("user_id", userIds);

  if (error) throw error;

  const byUserId = new Map((Array.isArray(data) ? data : []).map((p) => [p.user_id, p]));

  return reviews.map((r) => {
    const p = byUserId.get(r.user_id);
    return {
      ...r,
      username: p?.username ?? null,
      display_name: p?.display_name ?? null,
      avatar_url: p?.avatar_url ?? null,
    };
  });
}

async function listAll({ limit = 50, experienceTag = null } = {}) {
  let q = supabaseAdmin
    .from("reviews")
    .select("review_id, user_id, rating, experience_tag, review_text, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (experienceTag) {
    q = q.eq("experience_tag", experienceTag);
  }

  const { data, error } = await q;
  if (error) throw error;
  return attachProfiles(data);
}

async function listForUser(userId) {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("review_id, user_id, rating, experience_tag, review_text, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return attachProfiles(data);
}

async function createForUser({ userId, rating, experienceTag, reviewText }) {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .insert({
      user_id: userId,
      rating,
      experience_tag: experienceTag ?? null,
      review_text: reviewText,
    })
    .select("review_id, user_id, rating, experience_tag, review_text, created_at")
    .single();

  if (error) throw error;
  const enriched = await attachProfiles([data]);
  return enriched[0] || data;
}

module.exports = {
  listAll,
  listForUser,
  createForUser,
};
