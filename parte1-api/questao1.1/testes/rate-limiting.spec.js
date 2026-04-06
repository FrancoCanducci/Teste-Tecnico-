const { test, expect } = require("@playwright/test");
const rateLimitHelper = require("./utils/rate-limit-helper.js");

const GITHUB_USER_URL = "https://api.github.com/users/github";

test.describe("Questão 1.1 — Rate limiting (GitHub API)", () => {
  test("GET /users/github expõe headers X-RateLimit-*", async ({ request }) => {
    const response = await rateLimitHelper.getWithRateLimitProtection(request, GITHUB_USER_URL);

    expect(response.status(), "deve retornar 200 em condições normais").toBe(200);
    expect(rateLimitHelper.hasAllRateLimitHeaders(response)).toBe(true);

    const parsed = rateLimitHelper.parseRateLimitHeaders(response);
    expect(parsed).not.toBeNull();
    expect(parsed.limit).toBeGreaterThan(0);
    expect(parsed.remaining).toBeGreaterThanOrEqual(0);
    expect(parsed.reset).toBeGreaterThan(0);
  });

  test("mecanismo anti-bloqueio: não atrasa quando a cota está confortável", async () => {
    const response = {
      status: () => 200,
      headers: () => ({
        "x-ratelimit-limit": "5000",
        "x-ratelimit-remaining": "100",
        "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + 3600),
      }),
    };

    const start = Date.now();
    await rateLimitHelper.waitIfApproachingLimit(response, { minRemaining: 5 });
    expect(Date.now() - start).toBeLessThan(80);
  });

  test("mecanismo anti-bloqueio: com cota baixa e janela já renovada, não bloqueia indefinidamente", async () => {
    const nowSec = Math.floor(Date.now() / 1000);
    const response = {
      status: () => 200,
      headers: () => ({
        "x-ratelimit-limit": "60",
        "x-ratelimit-remaining": "0",
        "x-ratelimit-reset": String(nowSec - 120),
      }),
    };

    const start = Date.now();
    await rateLimitHelper.waitIfApproachingLimit(response, {
      minRemaining: 5,
      marginSeconds: 0,
    });
    expect(Date.now() - start).toBeLessThan(150);
  });

  test("detecta rate limit atingido (403) pelos headers esperados", async () => {
    const mock403 = {
      status: () => 403,
      headers: () => ({
        "x-ratelimit-limit": "60",
        "x-ratelimit-remaining": "0",
        "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + 3600),
      }),
    };

    expect(rateLimitHelper.isRateLimitExceeded(mock403)).toBe(true);

    const mock403SemHeaders = {
      status: () => 403,
      headers: () => ({}),
    };
    expect(rateLimitHelper.isRateLimitExceeded(mock403SemHeaders)).toBe(false);
  });

  test("integração: se a API retornar 403, reconhece como rate limit quando headers batem", async ({
    request,
  }) => {
    const response = await request.get(GITHUB_USER_URL);

    if (response.status() === 403) {
      expect(rateLimitHelper.isRateLimitExceeded(response)).toBe(true);
    } else {
      expect(response.status()).toBe(200);
    }
  });
});
