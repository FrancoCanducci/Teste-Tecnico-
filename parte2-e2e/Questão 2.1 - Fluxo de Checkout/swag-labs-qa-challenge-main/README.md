# Swag Labs QA Challenge

Este repositório contém a estratégia de testes, documentação e automação para a plataforma [Swag Labs (V1)](https://www.saucedemo.com/).

---

## 🚀 Tecnologias Utilizadas
* **Cypress**: Framework de automação E2E.
* **JavaScript**: Linguagem base.
* **Mochawesome**: Relatórios de execução.

---

## 📂 Estrutura do Projeto
```
SWAG-LABS-QA-CHALLENGE
├── cypress
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
---

## 🤖 Automação

A automação cobre:

- Fluxo completo de compra com `standard_user`
- Validações obrigatórias na etapa de Informations
- Cenários comportamentais

A modelagem foi feita priorizando comportamento de negócio e não detalhes de implementação da interface.

---

## 🛠️ Como Executar

1. Instalar dependências:
   `npm install`

2. Executar interface interativa:
   `npm run open`

3. Executar em modo headless:
   `npm run test`

Relatórios serão gerados via Mochawesome após execução.

---

## 📌 Considerações

O foco da abordagem foi:
- Cobertura do fluxo crítico de compra
- Identificação de riscos funcionais
- Validação de regras obrigatórias
- Análise de comportamentos inconsistentes com usuário *problem_user*

Para a documentação, recomendo a seguinte ordem:
1) Plano de teste `/docs/test-plan.md`
2) Casos de teste `/docs/test-cases.md`
3) Bug report `/docs/bug-report.md`
4) Report da execução `/docs/execution-report.md`