# 📁 Meu Repositório

Este repositório reúne diferentes abordagens de testes automatizados e aplicações auxiliares, organizadas de acordo com o tipo de teste, escopo e estratégia adotada. O objetivo é demonstrar na prática a aplicação de conceitos de QA, incluindo testes de API, E2E, arquivos, mobile, mocks e pirâmide de testes.

---

## 🧱 Estrutura do Projeto

| Pasta | Descrição |
|------|----------|
| `parte1-api/` | Testes de API REST (endpoints, status codes, regras de negócio) |
| `parte2-e2e/` | Testes end-to-end com Playwright |
| `parte3-frontend/` | Aplicação frontend utilizada nos testes |
| `parte4-arquivos/` | Testes com arquivos (ex: CSV) |
| `parte5-mobile/` | Testes mobile |
| `parte6-piramide/` | Estrutura baseada na pirâmide de testes |
| `parte7-mocks/` | Testes com mocks e stubs |

Cada pasta funciona de forma independente e pode conter sua própria configuração e contexto.

---

## ⚙️ Scripts

```bash
npm test              # Executa todos os testes
npm run test:api      # Testes de API
npm run test:e2e      # Testes E2E
npm run test:files    # Testes com arquivos
npm run test:mobile   # Testes mobile
npm run test:pyramid  # Testes da pirâmide
npm run test:mocks    # Testes com mocks
npm run test:ui       # Interface do Playwright
