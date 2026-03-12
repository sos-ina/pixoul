const service = require("./profile.service");

async function update(req, res) {
  const result = await service.update({ user: req.user, payload: req.body });
  return res.status(200).json(result);
}

async function uploadAvatar(req, res) {
  const result = await service.uploadAvatar({ user: req.user, payload: req.body });
  return res.status(200).json(result);
}

async function uploadAvatarFile(req, res) {
  const result = await service.uploadAvatarFile({ user: req.user, payload: req.body });
  return res.status(200).json(result);
}

module.exports = {
  update,
  uploadAvatar,
  uploadAvatarFile,
};
