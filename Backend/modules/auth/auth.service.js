const { supabaseAdmin } = require("../../config/supabaseClient");

function badRequest(message) {
  return { status: 400, body: { success: false, error: message } };
}

function isValidEmailFormat(email) {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function validatePassword(password) {
  if (typeof password !== "string") return "Password must be at least 8 characters long";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  if (!/[!@#$%^&*\-_]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return null;
}

function validateUsername(username) {
  if (typeof username !== "string") return "Username must be between 3 and 50 characters";
  const trimmed = username.trim();
  if (trimmed.length < 3 || trimmed.length > 50) {
    return "Username must be between 3 and 50 characters";
  }
  if (!/^[A-Za-z0-9_]+$/.test(trimmed)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  return null;
}

async function emailExists(email) {
  const normalized = String(email || "").trim().toLowerCase();
  if (!normalized) return false;

  const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) throw error;
  return (data?.users || []).some((u) => String(u?.email || "").toLowerCase() === normalized);
}

async function usernameExists(username) {
  const trimmed = String(username || "").trim();
  if (!trimmed) return false;

  const { data, error } = await supabaseAdmin
    .from("user_profiles")
    .select("user_id")
    .ilike("username", trimmed)
    .limit(1);

  if (error) throw error;
  return Array.isArray(data) && data.length > 0;
}

async function register(payload) {
  const email = payload?.email;
  const password = payload?.password;
  const username = payload?.username;
  const displayName = payload?.displayName;
  const country = payload?.country;

  if (!email || !password || !username) {
    return badRequest("Missing required fields");
  }

  if (!isValidEmailFormat(email)) {
    return badRequest("Invalid email format");
  }

  const alreadyEmail = await emailExists(email);
  if (alreadyEmail) {
    return badRequest("Email already exists");
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return badRequest(passwordError);
  }

  const usernameError = validateUsername(username);
  if (usernameError) {
    return badRequest(usernameError);
  }

  const alreadyUsername = await usernameExists(username);
  if (alreadyUsername) {
    return badRequest("Username already exists");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000";
  const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.signUp({
    email: String(email).trim(),
    password: String(password),
    options: {
      emailRedirectTo: `${siteUrl.replace(/\/$/, "")}/auth/callback`,
    },
  });

  if (signUpError) {
    const msg = String(signUpError.message || "");
    if (msg.toLowerCase().includes("already") && msg.toLowerCase().includes("registered")) {
      return badRequest("Email already exists");
    }
    throw signUpError;
  }

  const authId = signUpData?.user?.id;
  if (!authId) {
    throw new Error("Failed to create auth user");
  }

  const { data: usersRow, error: usersError } = await supabaseAdmin
    .from("users")
    .insert({
      auth_id: authId,
      email: String(email).trim().toLowerCase(),
      role_id: 2,
      status: "active",
    })
    .select("user_id, email, role_id, status")
    .maybeSingle();

  if (usersError) {
    if (usersError?.code === "42501") {
      return { status: 400, body: { success: false, error: "Database policy blocked signup" } };
    }
    if (usersError?.code === "23502" && String(usersError?.message || "").includes('password_hash')) {
      return {
        status: 400,
        body: {
          success: false,
          error:
            "Database schema mismatch: users.password_hash is NOT NULL but passwords are managed by Supabase Auth. Make password_hash nullable or remove it.",
        },
      };
    }
    throw usersError;
  }

  if (!usersRow?.user_id) {
    throw new Error("Failed to create user record");
  }

  const { error: profileError } = await supabaseAdmin.from("user_profiles").insert({
    user_id: usersRow.user_id,
    username: String(username).trim(),
    display_name: displayName ?? null,
    country: country ?? null,
  });

  if (profileError) {
    if (profileError?.code === "42501") {
      return { status: 400, body: { success: false, error: "Database policy blocked signup" } };
    }
    throw profileError;
  }

  return {
    status: 201,
    body: {
      success: true,
      message: "Sign up successful! Check your email to verify.",
      user: {
        user_id: usersRow.user_id,
        email: usersRow.email,
        username: String(username).trim(),
        display_name: displayName ?? null,
      },
    },
  };
}

async function login(payload) {
  const emailOrUsername = payload?.emailOrUsername;
  const password = payload?.password;
  const genericErr = "Invalid email or username or password";

  if (!emailOrUsername || !password) {
    return { status: 400, body: { success: false, error: genericErr } };
  }

  const input = String(emailOrUsername).trim();
  const isEmail = input.includes("@");

  let email = input;
  let userId = null;

  if (!isEmail) {
    const { data: profileRows, error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .select("user_id, username, display_name, avatar_url")
      .eq("username", input)
      .limit(1);

    if (profileError) throw profileError;
    const profile = profileRows?.[0];
    if (!profile?.user_id) {
      return { status: 400, body: { success: false, error: genericErr } };
    }

    userId = profile.user_id;
    const { data: userRows, error: userError } = await supabaseAdmin
      .from("users")
      .select("user_id, email, role_id, status")
      .eq("user_id", userId)
      .maybeSingle();

    if (userError) {
      if (userError?.code === "PGRST116") {
        return { status: 400, body: { success: false, error: genericErr } };
      }
      throw userError;
    }
    if (!userRows?.email) {
      return { status: 400, body: { success: false, error: genericErr } };
    }
    email = userRows.email;
  }

  const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (signInError || !signInData?.session?.access_token) {
    return { status: 400, body: { success: false, error: genericErr } };
  }

  const authUser = signInData?.user;
  const authId = authUser?.id;
  if (!authId) {
    return { status: 400, body: { success: false, error: genericErr } };
  }

  const { data: usersRow, error: usersError } = await supabaseAdmin
    .from("users")
    .select("user_id, email, role_id, status")
    .eq("auth_id", authId)
    .maybeSingle();

  if (usersError) {
    if (usersError?.code === "PGRST116") {
      return { status: 400, body: { success: false, error: genericErr } };
    }
    throw usersError;
  }

  if (!usersRow?.user_id) {
    return { status: 400, body: { success: false, error: genericErr } };
  }
  if (usersRow?.status !== "active") {
    return { status: 403, body: { success: false, error: genericErr } };
  }

  const { data: profileRow, error: profileError } = await supabaseAdmin
    .from("user_profiles")
    .select("username, display_name, avatar_url")
    .eq("user_id", usersRow.user_id)
    .maybeSingle();

  if (profileError) {
    if (profileError?.code === "PGRST116") {
      return { status: 400, body: { success: false, error: genericErr } };
    }
    throw profileError;
  }

  await supabaseAdmin
    .from("users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("user_id", usersRow.user_id);

  return {
    status: 200,
    body: {
      success: true,
      token: signInData.session.access_token,
      user: {
        user_id: usersRow.user_id,
        email: usersRow.email,
        username: profileRow?.username,
        display_name: profileRow?.display_name ?? null,
        avatar_url: profileRow?.avatar_url ?? null,
        role_id: usersRow.role_id,
      },
    },
  };
}

async function logout() {
  return { status: 200, body: { success: true } };
}

async function forgotPassword(payload) {
  const email = payload?.email;

  if (!email) {
    return badRequest("Email is required");
  }

  if (!isValidEmailFormat(email)) {
    return badRequest("Invalid email format");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000";
  const redirectTo = `${siteUrl.replace(/\/$/, "")}/auth/reset`;

  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(String(email).trim().toLowerCase(), {
    redirectTo,
  });

  if (error) {
    return {
      status: 200,
      body: { success: true, message: "If an account exists, a password reset email has been sent." },
    };
  }

  return {
    status: 200,
    body: { success: true, message: "If an account exists, a password reset email has been sent." },
  };
}

async function me({ headers } = {}) {
  const header = headers?.authorization || headers?.Authorization || "";
  const token = String(header).startsWith("Bearer ")
    ? String(header).slice("Bearer ".length)
    : null;

  if (!token) {
    return { status: 401, body: { success: false, error: "Unauthorized" } };
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user?.id) {
    return { status: 401, body: { success: false, error: "Unauthorized" } };
  }

  const authId = data.user.id;
  const { data: usersRow, error: usersError } = await supabaseAdmin
    .from("users")
    .select("user_id, email, role_id, status")
    .eq("auth_id", authId)
    .maybeSingle();

  if (usersError) throw usersError;
  if (!usersRow?.user_id || usersRow?.status !== "active") {
    return { status: 401, body: { success: false, error: "Unauthorized" } };
  }

  const { data: profileRow, error: profileError } = await supabaseAdmin
    .from("user_profiles")
    .select("username, display_name, country, date_of_birth, bio, avatar_url")
    .eq("user_id", usersRow.user_id)
    .maybeSingle();

  if (profileError) {
    if (profileError?.code !== "PGRST116") throw profileError;
  }

  return {
    status: 200,
    body: {
      success: true,
      user: {
        user_id: usersRow.user_id,
        email: usersRow.email,
        role_id: usersRow.role_id,
        username: profileRow?.username,
        display_name: profileRow?.display_name ?? null,
        country: profileRow?.country ?? null,
        date_of_birth: profileRow?.date_of_birth ?? null,
        bio: profileRow?.bio ?? null,
        avatar_url: profileRow?.avatar_url ?? null,
      },
    },
  };
}

module.exports = {
  login,
  register,
  forgotPassword,
  logout,
  me,
};
