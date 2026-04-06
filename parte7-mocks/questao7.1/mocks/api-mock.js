const express = require("express");
const http = require("http");
const Ajv = require("ajv");

const PRODUCT_SCHEMA = require("../schemas/product-schema.json");

const DEFAULT_PORT = 0; // porta dinamica

/**
 * @param {object} options
 * @param {number} [options.port]
 */
function startMockServer(options = {}) {
  const port = options.port ?? DEFAULT_PORT;
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  const ajv = new Ajv({ allErrors: true, strict: false });
  const validateProduct = ajv.compile(PRODUCT_SCHEMA);

  const products = new Map();
  products.set(1, { id: 1, title: "Product", price: 100 });
  let listRequests = 0;

  const getListRateLimit = () => listRequests >= 10;

  app.get("/products", (req, res) => {
    const slow = String(req.query.slow).toLowerCase() === "true";
    const error500 = String(req.query.error).toLowerCase() === "500";

    if (error500) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    // Rate limit (simulado): após 10 listagens, a próxima retorna 429.
    if (getListRateLimit()) {
      res.status(429).json({ error: "Rate limit exceeded" });
      return;
    }

    listRequests++;

    if (slow) {
      // Simula "timeout": o teste vai usar timeout curto.
      setTimeout(() => {
        res.json({ data: Array.from(products.values()) });
      }, 6000);
      return;
    }

    res.json({ data: Array.from(products.values()) });
  });

  app.post("/products", (req, res) => {
    const payload = req.body;
    if (!validateProduct(payload)) {
      res.status(400).json({
        error: "Invalid payload",
        details: validateProduct.errors,
      });
      return;
    }

    // Permite que o cliente envie ou não o id.
    const id = payload.id ?? Math.max(0, ...Array.from(products.keys())) + 1;
    const product = { id, title: payload.title, price: payload.price };
    products.set(id, product);
    res.status(201).json(product);
  });

  app.put("/products/:id", (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (!products.has(id)) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const payload = req.body;
    // Para update, exigimos title/price; id do corpo pode existir, mas ignoramos.
    const normalized = { ...payload, id };
    if (!validateProduct(normalized)) {
      res.status(400).json({
        error: "Invalid payload",
        details: validateProduct.errors,
      });
      return;
    }

    const updated = { id, title: normalized.title, price: normalized.price };
    products.set(id, updated);
    res.json(updated);
  });

  app.delete("/products/:id", (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (!products.has(id)) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    products.delete(id);
    res.status(204).send();
  });

  app.get("/products/:id", (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (!products.has(id)) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(products.get(id));
  });

  const server = http.createServer(app);

  return new Promise((resolve) => {
    const s = server.listen(port, "127.0.0.1", () => {
      const addr = s.address();
      const actualPort = typeof addr === "object" && addr ? addr.port : port;
      resolve({
        app,
        server: s,
        url: `http://127.0.0.1:${actualPort}`,
      });
    });
  });
}

module.exports = {
  startMockServer,
};

