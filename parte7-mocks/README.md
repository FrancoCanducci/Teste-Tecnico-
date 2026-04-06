# API Mock Tests — Playwright

Este projeto demonstra como testar integrações com APIs externas utilizando **mocks controlados**, garantindo testes rápidos, determinísticos e independentes de serviços reais.

---

## 📌 Objetivo

Validar o comportamento de uma API simulada cobrindo cenários reais como:

* Sucesso (200 / 201)
* Validação de payload (400)
* Recurso não encontrado (404)
* Erro interno (500)
* Timeout
* Rate limiting (429)

---

## 📦 Requisitos

* Node.js (versão 16 ou superior)
* npm

---

## 🧱 Estrutura do Projeto

```bash
.
├── with-mock.spec.js        # Testes de API usando Playwright
├── mocks/
│   └── api-mock.js          # Servidor mock (Express)
├── schemas/
│   └── product-schema.json  # Schema de validação (AJV)
```

---

## 🧪 Testes implementados

### 🔹 GET /products

* Retorna lista de produtos
* Valida estrutura da resposta

### 🔹 POST /products

* Cria novo produto válido (201)
* Valida retorno (id, title, price)
* Testa payload inválido (400)

### 🔹 PUT /products/:id

* Atualiza produto existente
* Retorna 404 para ID inexistente
* Valida erro de schema (400)

### 🔹 DELETE /products/:id

* Remove produto (204)
* Garante que não pode mais ser acessado (404)

### 🔹 GET /products/:id

* Retorna produto existente
* Retorna erro para produto inexistente (404)

### 🔹 Cenários avançados

* **Timeout simulado**

  * Endpoint com delay proposital para testar timeout do cliente

* **Erro 500 simulado**

  * Retorno controlado de erro interno

* **Rate limiting**

  * Após 10 requisições, API retorna 429

---

## 🧩 Mock Server

O mock é implementado com **Express** e roda localmente em porta dinâmica.

Cada teste sobe um servidor isolado (`beforeEach`) e finaliza após execução (`afterEach`), garantindo:

* Isolamento total entre testes
* Nenhum efeito colateral
* Execução previsível

---

## 📐 Validação de Schema

A API utiliza **AJV (Another JSON Validator)** para validar os payloads com base no schema:

### `product-schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Product",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "price": {
      "type": "number",
      "exclusiveMinimum": 0
    }
  },
  "required": ["title", "price"]
}
```

### Regras aplicadas:

* `title` obrigatório e não pode ser vazio
* `price` obrigatório e deve ser maior que 0
* `id` opcional, mas se enviado deve ser ≥ 1
* Propriedades extras não são permitidas

---

## 🚀 Como rodar o projeto

### 1. Inicializar o projeto (caso necessário)

```bash
npm init -y
```

### 2. Instalar dependências

```bash
npm install -D @playwright/test
npm install express ajv
```

### 3. Instalar browsers do Playwright

```bash
npx playwright install
```

### 4. Executar os testes

```bash
npx playwright test
```

