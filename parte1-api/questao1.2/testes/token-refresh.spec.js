const { test: base, expect } = require("@playwright/test");
const { AuthManager } = require("./auth-manager.js");

const USERS_2_URL = "https://reqres.in/api/users/2";

/** Uma instância de `AuthManager` por worker (processo Playwright) — evita conflito entre testes paralelos. */
const test = base.extend({
  authManager: [
    async ({}, use, workerInfo) => {
      const manager = new AuthManager({
        workerId: workerInfo.workerIndex,
        ttlMs: 2 * 60 * 1000,
      });
      await use(manager);
    },
    { scope: "worker" },
  ],
});

test.describe("Questão 1.2 — Gerenciamento de tokens (ReqRes)", () => {
  test("POST /api/login retorna token JWT", async ({ request, authManager }) => {
    await authManager.login(request);
    expect(authManager.token).toBeTruthy();
    expect(typeof authManager.token).toBe("string");
  });

  test("GET /api/users/2 com Authorization Bearer", async ({ request, authManager }) => {
    const response = await authManager.getJson(request, USERS_2_URL);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBe(2);
  });

  test("mecanismo detecta token prestes a expirar (TTL simulado 2 min)", async ({
    authManager,
  }) => {
    authManager.issuedAt = Date.now();
    expect(authManager.isAboutToExpire()).toBe(false);

    authManager.issuedAt = Date.now() - authManager.ttlMs + 5000;
    expect(authManager.isAboutToExpire()).toBe(true);
  });

  test("refresh automático após expiração simulada", async ({ request, authManager }) => {
    await authManager.login(request);
    const issuedAntes = authManager.issuedAt;

    authManager.issuedAt = Date.now() - authManager.ttlMs - 1000;
    expect(authManager.isExpired()).toBe(true);

    const response = await authManager.getJson(request, USERS_2_URL);
    expect(response.ok()).toBeTruthy();

    expect(authManager.issuedAt).toBeGreaterThan(issuedAntes);
    expect(Date.now() - authManager.issuedAt).toBeLessThan(30_000);
    expect(authManager.isExpired()).toBe(false);
    expect(authManager.token).toBeTruthy();
  });

  test("várias chamadas concorrentes no mesmo worker não corrompem o token", async ({
    request,
    authManager,
  }) => {
    await authManager.login(request);
    authManager.issuedAt = Date.now() - authManager.ttlMs - 500;

    const results = await Promise.all([
      authManager.getJson(request, USERS_2_URL),
      authManager.getJson(request, USERS_2_URL),
      authManager.getJson(request, USERS_2_URL),
    ]);

    for (const res of results) {
      expect(res.ok()).toBeTruthy();
    }
    expect(authManager.isExpired()).toBe(false);
  });

  test("workers paralelos usam instâncias isoladas (sem estado compartilhado)", async ({
    authManager,
  }, testInfo) => {
    expect(authManager.workerId).toBe(testInfo.workerIndex);
  });
});
