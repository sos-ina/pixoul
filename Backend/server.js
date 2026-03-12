const { getEnv } = require("./config/env");
const { createApp } = require("./app");
const logger = require("./utils/logger");

function start() {
  const env = getEnv();
  const app = createApp();

  try {
    const host = String(env.SUPABASE_URL || "").replace(/^https?:\/\//, "").split("/")[0];
    logger.info(`Supabase project: ${host || "(missing SUPABASE_URL)"}`);
  } catch {
    logger.info("Supabase project: (unable to parse SUPABASE_URL)");
  }

  app.listen(env.PORT, () => {
    logger.info(`Pixoul backend listening on http://localhost:${env.PORT}`);
  });
}

start();
