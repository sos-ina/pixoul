const profileRepo = require("../profile/profile.repository");
const repo = require("./reviews.repository");

function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function normalizeRating(input) {
  const r = Number(input);
  if (!Number.isFinite(r)) return null;
  const rounded = Math.round(r);
  if (rounded < 1 || rounded > 5) return null;
  return rounded;
}

function normalizeLimit(input) {
  const n = Number(input);
  if (!Number.isFinite(n)) return 50;
  return Math.max(1, Math.min(200, Math.floor(n)));
}

async function list({ query }) {
  const limit = normalizeLimit(query?.limit);
  const experienceTag = query?.experienceTag ? String(query.experienceTag).trim() : null;

  const reviews = await repo.listAll({ limit, experienceTag: experienceTag || null });

  return {
    success: true,
    reviews,
  };
}

async function getMine({ user }) {
  if (!user?.id) throw httpError(401, "Unauthorized");

  const appUser = await profileRepo.getAppUserByAuthId(user.id);
  if (!appUser?.user_id) throw httpError(401, "Unauthorized");

  const reviews = await repo.listForUser(appUser.user_id);

  return {
    success: true,
    reviews,
  };
}

async function create({ user, payload }) {
  if (!user?.id) throw httpError(401, "Unauthorized");

  const appUser = await profileRepo.getAppUserByAuthId(user.id);
  if (!appUser?.user_id) throw httpError(401, "Unauthorized");

  const rating = normalizeRating(payload?.rating);
  if (!rating) throw httpError(400, "rating must be an integer between 1 and 5");

  const reviewText = String(payload?.reviewText ?? payload?.review_text ?? "").trim();
  if (!reviewText) throw httpError(400, "reviewText is required");
  if (reviewText.length > 2000) throw httpError(400, "reviewText must be 2000 characters or less");

  const experienceTag = payload?.experienceTag ?? payload?.experience_tag ?? null;

  const created = await repo.createForUser({
    userId: appUser.user_id,
    rating,
    experienceTag: experienceTag ? String(experienceTag).trim().slice(0, 80) : null,
    reviewText,
  });

  return {
    success: true,
    review: created,
  };
}

module.exports = {
  list,
  getMine,
  create,
};
