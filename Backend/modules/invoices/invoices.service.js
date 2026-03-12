const repo = require("./invoices.repository");

async function list() {
  return repo.placeholder();
}

async function getById() {
  return repo.placeholder();
}

module.exports = {
  list,
  getById,
};
