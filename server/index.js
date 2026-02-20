const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envCandidates = [
  path.resolve(process.cwd(), ".env.local"),
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, ".env.local"),
  path.resolve(__dirname, ".env"),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false });
  }
}

const express = require("express");

const chatRoutes = require("../services/chat/chat.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("OK");
});

app.get("/health", (req, res) => {
  return res.status(200).json({ ok: true });
});

app.use("/api", chatRoutes);

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  console.log(`Pixoul chat server listening on http://localhost:${port}`);
});