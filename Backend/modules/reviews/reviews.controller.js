const service = require("./reviews.service");

async function list(req, res) {
  const body = await service.list({ query: req.query });
  return res.status(200).json(body);
}

async function getMine(req, res) {
  const body = await service.getMine({ user: req.user });
  return res.status(200).json(body);
}

async function create(req, res) {
  const body = await service.create({ user: req.user, payload: req.body });
  return res.status(201).json(body);
}

module.exports = {
  list,
  getMine,
  create,
};
