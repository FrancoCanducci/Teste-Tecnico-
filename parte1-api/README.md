# Parte 1 — Testes de API

Testes contra APIs REST (Playwright `APIRequestContext`).

## Questão 1.1 — Rate limiting

**Contexto:** validar uma API REST com rate limiting (referência: 100 req/min em cenários genéricos; a GitHub API usa limites próprios).

**API usada:** [GitHub REST API](https://api.github.com)

Limites típicos da GitHub API:

- ~60 requisições/hora sem autenticação
- ~5000 requisições/hora com autenticação

**Endpoint de teste:** `GET https://api.github.com/users/github`

### O que foi implementado

| Entregável | Descrição |
|------------|-----------|
| `questao1.1/testes/rate-limiting.spec.js` | Valida headers `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`; proteção contra bloqueio; detecção de 403 por rate limit |
| `questao1.1/testes/utils/rate-limit-helper.js` | Parse dos headers, espera quando a cota está baixa, `getWithRateLimitProtection` para requisições seguras |

## Questão 1.2 — Gerenciamento de tokens

**Contexto:** API retorna JWT com validade de 15 minutos; a suíte roda ~45 min com várias chamadas autenticadas.

**API usada:** [ReqRes](https://reqres.in)

| Item | Detalhe |
|------|---------|
| Login | `POST https://reqres.in/api/login` — body `{ "email": "eve.holt@reqres.in", "password": "cityslicka" }` |
| Autenticado | `GET https://reqres.in/api/users/2` — header `Authorization: Bearer {token}` |

**Simulação:** no código, o tempo de vida do token é tratado como **2 minutos** (`ttlMs`), em vez de 15 minutos, para testar expiração e refresh sem esperar o tempo real.

### O que foi implementado

| Entregável | Descrição |
|------------|-----------|
| `questao1.2/testes/auth-manager.js` | Classe `AuthManager`: login, detecção de expiração / “prestes a expirar”, `ensureValidToken`, `getJson` com Bearer, fila para refresh concorrente no mesmo worker |
| `questao1.2/testes/token-refresh.spec.js` | Testes + fixture `authManager` com `scope: 'worker'` (uma instância por worker Playwright — paralelo sem estado compartilhado) |

### Executar

```bash
npm run test:api
```

Para só a questão 1.2:

```bash
npx playwright test parte1-api/questao1.2
```
