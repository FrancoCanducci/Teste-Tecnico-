/**
 * Gerenciamento de token ReqRes + simulação de expiração (2 min em vez de 15 min reais).
 * @see https://reqres.in/
 */

const REQRES_LOGIN_URL = "https://reqres.in/api/login";

const DEFAULT_CREDENTIALS = {
  email: "eve.holt@reqres.in",
  password: "cityslicka",
};

class AuthManager {
  /**
   * @param {{
   *   ttlMs?: number,
   *   refreshBeforeExpiryMs?: number,
   *   email?: string,
   *   password?: string,
   *   workerId?: number,
   * }} [options]
   */
  constructor(options = {}) {
    /** Tempo de vida simulado do token (padrão: 2 minutos). */
    this.ttlMs = options.ttlMs ?? 2 * 60 * 1000;
    /** Renova antes de expirar quando restar menos que este intervalo. */
    this.refreshBeforeExpiryMs =
      options.refreshBeforeExpiryMs ?? 15 * 1000;

    this.email = options.email ?? DEFAULT_CREDENTIALS.email;
    this.password = options.password ?? DEFAULT_CREDENTIALS.password;
    this.workerId = options.workerId ?? 0;

    this.token = null;
    this.issuedAt = null;

    /** Serializa refresh concorrente no mesmo worker. */
    this._refreshChain = Promise.resolve();
  }

  /** @returns {number | null} */
  getSimulatedExpiryMs() {
    if (!this.issuedAt) return null;
    return this.issuedAt + this.ttlMs;
  }

  /** Token já passou do limite simulado. */
  isExpired() {
    if (!this.issuedAt) return true;
    return Date.now() >= this.issuedAt + this.ttlMs;
  }

  /**
   * Dentro da janela de refresh (antes do TTL acabar) ou já expirado.
   * Equivale a “prestes a expirar” para fins de renovação automática.
   */
  isAboutToExpire() {
    if (!this.issuedAt) return true;
    const expiry = this.issuedAt + this.ttlMs;
    return Date.now() >= expiry - this.refreshBeforeExpiryMs;
  }

  shouldRefresh() {
    return !this.token || this.isAboutToExpire();
  }

  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  async login(request) {
    const res = await request.post(REQRES_LOGIN_URL, {
      data: { email: this.email, password: this.password },
    });
    if (!res.ok()) {
      throw new Error(`Login falhou: HTTP ${res.status()} ${await res.text()}`);
    }
    const body = await res.json();
    if (!body.token) {
      throw new Error("Resposta de login sem campo token");
    }
    this.token = body.token;
    this.issuedAt = Date.now();
    return this.token;
  }

  /**
   * Garante token válido (refresh se expirado ou perto de expirar).
   * Chamadas concorrentes são enfileiradas para evitar corridas no mesmo worker.
   *
   * @param {import('@playwright/test').APIRequestContext} request
   */
  async ensureValidToken(request) {
    const run = async () => {
      if (this.shouldRefresh()) {
        await this.login(request);
      }
      return this.token;
    };
    const next = this._refreshChain.then(run, run);
    this._refreshChain = next.catch(() => {});
    return next;
  }

  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} url
   */
  async getJson(request, url) {
    await this.ensureValidToken(request);
    return request.get(url, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}

module.exports = {
  AuthManager,
  REQRES_LOGIN_URL,
  DEFAULT_CREDENTIALS,
};
