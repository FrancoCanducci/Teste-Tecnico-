const { test, expect } = require("@playwright/test");
const { startMockServer } = require("../mocks/api-mock.js");

test.describe("Questao 7.1 - Mocks de APIs Externas", () => {
  /** @type {{ url: string, server: import('http').Server } | null} */
  let mockServer = null;

  test.beforeEach(async () => {
    mockServer = await startMockServer({ port: 0 });
  });

  test.afterEach(async () => {
    if (mockServer?.server) {
      await new Promise((resolve) => mockServer.server.close(resolve));
    }
    mockServer = null;
  });

  test("requisicao bem-sucedida: GET /products retorna lista", async ({
    request,
  }) => {
    const res = await request.get(`${mockServer.url}/products`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test("POST /products cria produto e valida payload", async ({ request }) => {
    const createRes = await request.post(`${mockServer.url}/products`, {
      data: { title: "Product 2", price: 200 },
    });
    expect(createRes.status()).toBe(201);

    const created = await createRes.json();
    expect(created.id).toBeGreaterThan(0);
    expect(created.title).toBe("Product 2");
    expect(created.price).toBe(200);

    // Invalid payload (schema): price deve ser > 0
    const invalidRes = await request.post(`${mockServer.url}/products`, {
      data: { title: "", price: -1 },
    });
    expect(invalidRes.status()).toBe(400);
    const invalidBody = await invalidRes.json();
    expect(invalidBody.error).toBe("Invalid payload");
  });

  test("PUT /products/:id atualiza e DELETE /products/:id remove", async ({
    request,
  }) => {
    // Atualiza o produto seed id=1
    const putRes = await request.put(`${mockServer.url}/products/1`, {
      data: { title: "Updated", price: 150 },
    });
    expect(putRes.status()).toBe(200);
    const updated = await putRes.json();
    expect(updated.title).toBe("Updated");
    expect(updated.price).toBe(150);

    // 404 em update inexistente
    const put404 = await request.put(`${mockServer.url}/products/99999`, {
      data: { title: "X", price: 10 },
    });
    expect(put404.status()).toBe(404);

    // Invalid payload (schema) no PUT
    const put400 = await request.put(`${mockServer.url}/products/1`, {
      data: { title: "", price: 0 },
    });
    expect(put400.status()).toBe(400);

    // Deletar
    const delRes = await request.delete(`${mockServer.url}/products/1`);
    expect(delRes.status()).toBe(204);

    // Depois de deletar, GET deve 404
    const get404 = await request.get(`${mockServer.url}/products/1`);
    expect(get404.status()).toBe(404);
  });

  test("GET /products/:id 404 quando produto nao existe", async ({
    request,
  }) => {
    const res = await request.get(`${mockServer.url}/products/999`);
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("Product not found");
  });

  test("timeout simulado: GET /products?slow=true demora e deve estourar no cliente", async ({
    request,
  }) => {
    let thrown = null;
    try {
      await request.get(`${mockServer.url}/products?slow=true`, {
        timeout: 2000,
      });
    } catch (e) {
      thrown = e;
    }
    expect(thrown).not.toBeNull();
  });

  test("erro 500 simulado: GET /products?error=500", async ({ request }) => {
    const res = await request.get(`${mockServer.url}/products?error=500`);
    expect(res.status()).toBe(500);
    return res.json().then((body) => {
      expect(body.error).toBe("Internal server error");
    });
  });

  test("rate limiting simulado: GET /products retorna 429 apos 10 listagens", async ({
    request,
  }) => {
    // Para tornar determinístico, fazemos as 11 chamadas aqui dentro do mesmo teste.
    for (let i = 0; i < 10; i++) {
      const res = await request.get(`${mockServer.url}/products`);
      expect(res.status()).toBe(200);
    }

    const resAfter = await request.get(`${mockServer.url}/products`);
    expect(resAfter.status()).toBe(429);
    const body = await resAfter.json();
    expect(body.error).toBe("Rate limit exceeded");
  });
});

