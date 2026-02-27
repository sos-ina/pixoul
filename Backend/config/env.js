const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envFileName = fs.existsSync(path.resolve(process.cwd(), ".env.local"))
  ? ".env.local"
  : ".env";

dotenv.config({ path: path.resolve(process.cwd(), envFileName) });

const REQUIRED_VARS = [
  "PORT",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
];

function getEnv() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (missing.length) {
    const message = `Missing required environment variables: ${missing.join(", ")}`;
    const err = new Error(message);
    err.code = "ERR_MISSING_ENV";
    throw err;
  }

  return {
    PORT: Number(process.env.PORT),
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NOMOD_BASE_URL: process.env.NOMOD_BASE_URL,
    NOMOD_SECRET_KEY: process.env.NOMOD_SECRET_KEY,
    NOMOD_WEBHOOK_SECRET: process.env.NOMOD_WEBHOOK_SECRET,
  };
}

module.exports = {
  getEnv,
};
