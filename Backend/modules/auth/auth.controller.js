const service = require("./auth.service");

async function login(req, res) {
  const { status, body } = await service.login(req.body);
  return res.status(status).json(body);
}

async function register(req, res) {
  const { status, body } = await service.register(req.body);
  return res.status(status).json(body);
}

async function forgotPassword(req, res) {
  const { status, body } = await service.forgotPassword(req.body);
  return res.status(status).json(body);
}

async function logout(req, res) {
  const { status, body } = await service.logout(req.body);
  return res.status(status).json(body);
}

async function me(req, res) {
  const { status, body } = await service.me({ headers: req.headers });
  return res.status(status).json(body);
}

module.exports = {
  login,
  register,
  forgotPassword,
  logout,
  me,
};
