function formatMeta(meta) {
  if (!meta) return "";
  try {
    return ` ${JSON.stringify(meta)}`;
  } catch {
    return "";
  }
}

function log(level, message, meta) {
  const line = `[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}${formatMeta(
    meta
  )}`;

  // eslint-disable-next-line no-console
  console.log(line);
}

module.exports = {
  info: (message, meta) => log("info", message, meta),
  warn: (message, meta) => log("warn", message, meta),
  error: (message, meta) => log("error", message, meta),
};
