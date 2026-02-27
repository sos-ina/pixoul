const { supabaseAdmin } = require("../config/supabaseClient");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

    if (!token) {
      return res.status(401).json({ error: { message: "Unauthorized" } });
    }

    // Placeholder logic: validate token against Supabase.
    // In production, consider caching and/or using a dedicated auth service.
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: { message: "Unauthorized" } });
    }

    req.user = data.user;
    req.accessToken = token;

    return next();
  } catch (err) {
    return next(err);
  }
};
