const logger = require("../utils/logger");

module.exports = function errorHandler(err, req, res, next) {
  const status = Number(err?.statusCode || err?.status || 500);

  logger.error("Unhandled error", {
    status,
    message: err?.message,
    code: err?.code,
    path: req?.originalUrl,
    method: req?.method,
  });

  const payload = {
    error: {
      message: status >= 500 ? "Internal server error" : err.message,
    },
  };

  return res.status(status).json(payload);
};
