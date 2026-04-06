# Dynamic Selectors — Playwright Tests

Este projeto contém testes automatizados utilizando **Playwright** para validar estratégias de seleção de elementos em uma página com conteúdo dinâmico.

A aplicação utilizada é:
👉 https://the-internet.herokuapp.com/dynamic_content

---

## 📌 Objetivo

Demonstrar diferentes formas de localizar elementos de maneira confiável, mesmo quando o conteúdo da página muda a cada refresh.

As estratégias cobertas incluem:

* Texto visível
* Estrutura do DOM (nth-child / nth-of-type)
* Atributos parciais
* Hierarquia (parent > child)
* XPath

---

## 📦 Requisitos

* Node.js (versão 16 ou superior)
* npm

---

## 🧱 Estrutura do Projeto

```
.
├── dynamic-selector.spec.js   # Testes E2E
├── pages/
│   └── dynamic-page.js       # Page Object Model
```

---

## 🧪 Testes implementados

### 1. Texto visível

Valida elementos estáticos da página (título e parágrafo) que não mudam após refresh.

### 2. Estrutura DOM (nth-child)

Valida elementos baseados na posição na árvore DOM, mesmo com conteúdo dinâmico.

### 3. Atributo parcial

Utiliza seletores baseados em padrões estáveis (ex: `src*`, `href*`).

### 4. Hierarquia (parent > child)

Localiza elementos com base na estrutura entre elementos pai e filho.

### 5. XPath

Utiliza XPath para acessar elementos em posições específicas da estrutura.

### 6. Robustez com múltiplos refreshes

Garante que os elementos dinâmicos continuam presentes e válidos após várias atualizações da página.

---

## 🧩 Page Object Model

O arquivo `dynamic-page.js` encapsula toda a lógica de seleção de elementos, seguindo o padrão **Page Object Model (POM)**.

Benefícios:

* Reutilização de código
* Manutenção simplificada
* Separação clara entre testes e lógica de UI

---

## 🚀 Como rodar o projeto

### 1. Inicializar o projeto (caso ainda não tenha package.json)

```bash
npm init -y
```

### 2. Instalar o Playwright

```bash
npm install -D @playwright/test
```

### 3. Instalar os browsers

```bash
npx playwright install
```

### 4. Executar os testes

```bash
npx playwright test
```

---

## 💡 Boas práticas aplicadas

* Uso de seletores estáveis sempre que possível
* Evitar dependência de conteúdo dinâmico
* Validações após refresh para garantir resiliência
* Isolamento da lógica de UI via Page Object
* Testes independentes e determinísticos

---
