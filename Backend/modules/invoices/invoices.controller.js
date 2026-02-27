const service = require("./invoices.service");

async function list(req, res) {
  const result = await service.list({ user: req.user });
  return res.status(200).json(result);
}

async function getById(req, res) {
  const result = await service.getById({ user: req.user, invoiceId: req.params.invoiceId });
  return res.status(200).json(result);
}

module.exports = {
  list,
  getById,
};
