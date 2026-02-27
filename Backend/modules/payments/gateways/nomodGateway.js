const axios = require("axios");
const { getEnv } = require("../../../config/env");

const env = getEnv();

class NomodGateway {
  constructor() {
    this.http = axios.create({
      baseURL: env.NOMOD_BASE_URL,
      timeout: 20000,
      headers: {
        Authorization: `Bearer ${env.NOMOD_SECRET_KEY}`,
      },
    });
  }

  async createPaymentSession() {
    return { ok: true };
  }
}

module.exports = {
  NomodGateway,
};
