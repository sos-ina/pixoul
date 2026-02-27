const service = require("./bookings.service");

async function create(req, res) {
  const result = await service.create({ user: req.user, payload: req.body });
  return res.status(200).json(result);
}

async function getMine(req, res) {
  const result = await service.getMine({ user: req.user });
  return res.status(200).json(result);
}

async function getById(req, res) {
  const result = await service.getById({ user: req.user, bookingId: req.params.bookingId });
  return res.status(200).json(result);
}

async function cancel(req, res) {
  const result = await service.cancel({ user: req.user, bookingId: req.params.bookingId });
  return res.status(200).json(result);
}

module.exports = {
  create,
  getMine,
  getById,
  cancel,
};
