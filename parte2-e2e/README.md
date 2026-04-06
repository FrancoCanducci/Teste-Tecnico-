# E2E Tests — Checkout & Multi-Tab (Playwright + Cypress)

Este módulo contém testes **end-to-end (E2E)** cobrindo fluxos reais de usuário e cenários de navegação mais complexos.

---

## 📌 Objetivo

Validar:

* Fluxo completo de checkout
* Geração dinâmica de dados
* Navegação entre múltiplas abas e janelas
* Controle de estado e contexto entre páginas

---

## 🧱 Estrutura do Projeto

```bash
parte2-e2e/
├── questao2.1/
│   ├── RESPOSTA_TEORICA.md
│   └── testes/
│     cypress
│   ├── e2e
│   │   ├── critical                 # Fluxos E2E e Happy Path (TC-01, TC-03)
│   │   └── validations              # Validações de campos e regras (TC-02, TC-04)
│   ├── fixtures                     # Massa de dados para os testes
│   └── support                      # Comandos customizados e utilitários
├── docs
│   ├── evidences                    # Prints e vídeos das falhas (BUG-001 a BUG-009)
│   ├── bug-report.md                # Detalhamento técnico das falhas encontradas
│   ├── execution-report.md          # Resumo de pass/fail e veredito final
│   ├── test-cases.md                # Roteiro de testes e sessões exploratórias
│   └── test-plan.md                 # Planejamento estratégico e análise de risco
└── README.md                        # Guia principal e visão geral do projeto
```
├── questao2.2/
│   ├── RESPOSTA_TEORICA.md
│   └── testes/
│       ├── multi-tab.spec.js
│       └── utils/
│           └── window-manager.js
```

---

## 🧪 Testes implementados

### 🔹 Questão 2.1 — Fluxo de Checkout

📍 Site: https://www.saucedemo.com

Este cenário foi implementado utilizando **Cypress**.

Cobertura:

* Login
* Adição de produtos ao carrinho
* Preenchimento de dados de checkout (dinâmicos)
* Finalização da compra
* Validação da confirmação do pedido


---

### 🔹 Questão 2.2 — Navegação Multi-Abas

📍 Site: https://demoqa.com/browser-windows

Implementado com **Playwright**.

Cobertura:

* Abertura de nova aba (New Tab)
* Navegação e validação de conteúdo
* Retorno à aba original
* Abertura de nova janela (New Window)
* Gerenciamento de múltiplas páginas simultaneamente


---

## 🚀 Como rodar o projeto

### Instalar dependências

```bash
npm install
```

### Instalar browsers do Playwright

```bash
npx playwright install
```

---

### Rodar testes E2E (Playwright)

```bash
npx playwright test parte2-e2e
```

---

### Rodar testes Cypress (checkout)

```bash
npx cypress open
```

ou

```bash
npx cypress run
```

---

## 💡 Boas práticas aplicadas

* Separação por contexto de teste (checkout vs multi-abas)
* Uso de Page Object para organização
* Geração dinâmica de dados
* Abstração de lógica complexa (WindowManager)
* Evitar dependência de serviços externos
* Testes independentes e determinísticos

---

## 📎 Observações

* O projeto do fluxo de checkout tem seu próprio README