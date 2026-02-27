const service = require("./payments.service");

async function createPayment(req, res) {
  const result = await service.createPayment({ user: req.user, payload: req.body });
  return res.status(200).json(result);
}

async function getPaymentStatus(req, res) {
  const result = await service.getPaymentStatus({
    user: req.user,
    paymentId: req.params.paymentId,
  });
  return res.status(200).json(result);
}

async function nomodWebhook(req, res) {
  const result = await service.nomodWebhook({
    headers: req.headers,
    rawBody: req.body,
  });

  return res.status(200).json(result);
}

module.exports = {
  createPayment,
  getPaymentStatus,
  nomodWebhook,
};
