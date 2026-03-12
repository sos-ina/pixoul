const service = require("./stats.service");

async function getMine(req, res) {
  const result = await service.getMine({ user: req.user });
  return res.status(200).json(result);
}

module.exports = {
  getMine,
};
