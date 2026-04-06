/**
 * Helpers para inspecionar e respeitar o rate limiting da GitHub REST API.
 * @see https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
 */

const GITHUB_RATE_HEADERS = [
  "x-ratelimit-limit",
  "x-ratelimit-remaining",
  "x-ratelimit-reset",
];

/**
 * @param {Record<string, string>} headers
 * @param {string} name
 * @returns {string | undefined}
 */
function getHeader(headers, name) {
  const lower = name.toLowerCase();
  const key = Object.keys(headers).find((k) => k.toLowerCase() === lower);
  return key !== undefined ? headers[key] : undefined;
}

/**
 * @param {import('@playwright/test').APIResponse | { status: () => number, headers: () => Record<string, string> }} response
 * @returns {{ limit: number, remaining: number, reset: number } | null}
 */
function parseRateLimitHeaders(response) {
  const headers = response.headers();
  const limitRaw = getHeader(headers, "x-ratelimit-limit");
  const remainingRaw = getHeader(headers, "x-ratelimit-remaining");
  const resetRaw = getHeader(headers, "x-ratelimit-reset");

  if (limitRaw === undefined || remainingRaw === undefined || resetRaw === undefined) {
    return null;
  }

  const limit = Number.parseInt(limitRaw, 10);
  const remaining = Number.parseInt(remainingRaw, 10);
  const reset = Number.parseInt(resetRaw, 10);

  if (Number.isNaN(limit) || Number.isNaN(remaining) || Number.isNaN(reset)) {
    return null;
  }

  return { limit, remaining, reset };
}

/**
 * @param {import('@playwright/test').APIResponse | { status: () => number, headers: () => Record<string, string> }} response
 */
function hasAllRateLimitHeaders(response) {
  const headers = response.headers();
  return GITHUB_RATE_HEADERS.every((name) => getHeader(headers, name) !== undefined);
}

/**
 * Evita bloqueio: se `remaining` estiver abaixo do mínimo, aguarda até o reset (com margem).
 * @param {import('@playwright/test').APIResponse} response
 * @param {{ minRemaining?: number, marginSeconds?: number }} [options]
 * @returns {Promise<void>}
 */
async function waitIfApproachingLimit(response, options = {}) {
  const minRemaining = options.minRemaining ?? 5;
  const marginSeconds = options.marginSeconds ?? 2;

  const parsed = parseRateLimitHeaders(response);
  if (!parsed) return;

  if (parsed.remaining >= minRemaining) return;

  const nowSec = Math.floor(Date.now() / 1000);
  const waitSec = Math.max(0, parsed.reset - nowSec + marginSeconds);
  if (waitSec > 0) {
    await new Promise((r) => setTimeout(r, waitSec * 1000));
  }
}

/**
 * Executa GET garantindo que, após a resposta, não seguimos em sequência com cota zerada.
 * Útil para encadear vários testes sem estourar o limite.
 *
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} url
 * @param {{ minRemaining?: number }} [options]
 */
async function getWithRateLimitProtection(request, url, options = {}) {
  const response = await request.get(url);
  await waitIfApproachingLimit(response, options);
  return response;
}

/**
 * GitHub retorna 403 quando o limite foi excedido (ou em alguns casos de abuso).
 * @param {import('@playwright/test').APIResponse | { status: () => number, headers: () => Record<string, string> }} response
 */
function isRateLimitExceeded(response) {
  if (response.status() !== 403) return false;
  return hasAllRateLimitHeaders(response);
}

module.exports = {
  GITHUB_RATE_HEADERS,
  getHeader,
  parseRateLimitHeaders,
  hasAllRateLimitHeaders,
  waitIfApproachingLimit,
  getWithRateLimitProtection,
  isRateLimitExceeded,
};
