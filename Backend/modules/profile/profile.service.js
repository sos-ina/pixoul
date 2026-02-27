const repo = require("./profile.repository");
const { supabaseAdmin } = require("../../config/supabaseClient");

function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function isValidUrl(url) {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function update({ user, payload }) {
  if (!user?.id) throw httpError(401, "Unauthorized");

  const appUser = await repo.getAppUserByAuthId(user.id);
  if (!appUser?.user_id) throw httpError(401, "Unauthorized");

  const patch = {
    display_name: payload?.displayName ?? payload?.display_name ?? null,
    country: payload?.country ?? null,
    date_of_birth: payload?.dateOfBirth ?? payload?.date_of_birth ?? null,
    bio: payload?.bio ?? null,
  };

  if (payload?.avatarUrl !== undefined || payload?.avatar_url !== undefined) {
    const avatarUrl = payload?.avatarUrl ?? payload?.avatar_url;
    if (avatarUrl && !isValidUrl(String(avatarUrl))) {
      throw httpError(400, "avatarUrl must be a valid URL");
    }
    patch.avatar_url = avatarUrl || null;
  }

  const updated = await repo.updateUserProfile(appUser.user_id, patch);

  return {
    success: true,
    user: {
      user_id: appUser.user_id,
      email: appUser.email,
      username: updated?.username,
      display_name: updated?.display_name ?? null,
      country: updated?.country ?? null,
      date_of_birth: updated?.date_of_birth ?? null,
      bio: updated?.bio ?? null,
      avatar_url: updated?.avatar_url ?? null,
    },
  };
}

async function uploadAvatar({ user, payload }) {
  if (!user?.id) throw httpError(401, "Unauthorized");

  const avatarUrl = payload?.avatarUrl;
  if (!avatarUrl) throw httpError(400, "avatarUrl is required");
  if (!isValidUrl(String(avatarUrl))) throw httpError(400, "avatarUrl must be a valid URL");

  const appUser = await repo.getAppUserByAuthId(user.id);
  if (!appUser?.user_id) throw httpError(401, "Unauthorized");

  const updated = await repo.updateUserProfile(appUser.user_id, { avatar_url: avatarUrl });

  return {
    success: true,
    message: "Avatar uploaded successfully",
    avatarUrl: updated?.avatar_url ?? avatarUrl,
  };
}

async function uploadAvatarFile({ user, payload }) {
  if (!user?.id) throw httpError(401, "Unauthorized");

  const fileName = payload?.fileName;
  const contentType = payload?.contentType;
  const dataBase64 = payload?.dataBase64;

  if (!fileName || !contentType || !dataBase64) {
    throw httpError(400, "fileName, contentType, and dataBase64 are required");
  }

  if (!String(contentType).startsWith("image/")) {
    throw httpError(400, "Only image uploads are allowed");
  }

  let buffer;
  try {
    buffer = Buffer.from(String(dataBase64), "base64");
  } catch {
    throw httpError(400, "Invalid dataBase64");
  }

  if (!buffer?.length) throw httpError(400, "Invalid image data");
  if (buffer.length > 5 * 1024 * 1024) throw httpError(400, "Image must be less than 5MB");

  const appUser = await repo.getAppUserByAuthId(user.id);
  if (!appUser?.user_id) throw httpError(401, "Unauthorized");

  const ext = String(fileName).split(".").pop() || "png";
  const objectPath = `user-${appUser.user_id}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("Avator")
    .upload(objectPath, buffer, { upsert: true, contentType: String(contentType) });

  if (uploadError) {
    throw httpError(400, uploadError.message || "Failed to upload avatar");
  }

  const { data: publicData } = supabaseAdmin.storage.from("Avator").getPublicUrl(objectPath);
  const avatarUrl = publicData?.publicUrl;
  if (!avatarUrl) throw httpError(500, "Failed to generate public URL");

  await repo.updateUserProfile(appUser.user_id, { avatar_url: avatarUrl });

  return {
    success: true,
    message: "Avatar uploaded successfully",
    avatarUrl,
  };
}

module.exports = {
  update,
  uploadAvatar,
  uploadAvatarFile,
};
