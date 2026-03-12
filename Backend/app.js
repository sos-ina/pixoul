const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "10mb" }));

  app.get("/health", (req, res) => {
    return res.status(200).json({ ok: true });
  });

  app.use("/api", apiRoutes);

  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
};
