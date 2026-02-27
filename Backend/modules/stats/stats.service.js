const profileRepo = require("../profile/profile.repository");
const repo = require("./stats.repository");

function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function computeXpFromBookings(bookingsCount) {
  return Math.max(0, Number(bookingsCount) || 0) * 100;
}

function computeWinsFromBookings(bookings) {
  const arr = Array.isArray(bookings) ? bookings : [];
  return arr.filter((b) => String(b?.status || "").toLowerCase() !== "cancelled").length;
}

function computeAchievementsUnlocked(bookings) {
  const arr = Array.isArray(bookings) ? bookings : [];
  const distinctExperiences = new Set(arr.map((b) => b?.experience_id).filter(Boolean));
  const unlocked = distinctExperiences.size * 2;
  return Math.min(50, unlocked);
}

async function getMine({ user }) {
  if (!user?.id) throw httpError(401, "Unauthorized");

  const appUser = await profileRepo.getAppUserByAuthId(user.id);
  if (!appUser?.user_id) throw httpError(401, "Unauthorized");

  const bookings = await repo.getBookingsForUser(appUser.user_id);
  const totalBookings = bookings.length;

  const totalXp = computeXpFromBookings(totalBookings);
  const wins = computeWinsFromBookings(bookings);
  const achievementsUnlocked = computeAchievementsUnlocked(bookings);

  const leaderboardRows = await repo.listBookingsForLeaderboard({ limit: 10000 });
  const countsByUser = new Map();
  for (const row of leaderboardRows) {
    const uid = row?.user_id;
    if (!uid) continue;
    countsByUser.set(uid, (countsByUser.get(uid) || 0) + 1);
  }

  const leaderboard = Array.from(countsByUser.entries()).map(([userId, count]) => ({
    userId,
    xp: computeXpFromBookings(count),
  }));

  leaderboard.sort((a, b) => b.xp - a.xp);

  let globalRank = null;
  if (leaderboard.length) {
    const idx = leaderboard.findIndex((r) => r.userId === appUser.user_id);
    if (idx >= 0) globalRank = idx + 1;
  }

  return {
    success: true,
    stats: {
      globalRank,
      totalXp,
      wins,
      achievements: {
        unlocked: achievementsUnlocked,
        total: 50,
      },
    },
  };
}

module.exports = {
  getMine,
};
