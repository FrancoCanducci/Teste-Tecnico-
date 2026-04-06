
# Meu repositório

Estrutura do projeto de testes e aplicações.

## Pastas

| Pasta | Propósito |
|-------|-----------|
| `parte1-api/` | Testes de API REST (ver [`parte1-api/README.md`](parte1-api/README.md)) |
| `parte2-e2e/` | Testes end-to-end (Playwright) |
| `parte3-frontend/` | Frontend |
| `parte4-arquivos/` | Arquivos estáticos / dados |
| `parte5-mobile/` | Mobile |
| `parte6-piramide/` | Pirâmide de testes / documentação |
| `parte7-mocks/` | Mocks e stubs |

## Scripts

- `npm test` — executa todos os testes Playwright
- `npm run test:api` — testes de API (`parte1-api`)
- `npm run test:e2e` — testes E2E (`parte2-e2e`)
- `npm run test:files` — testes de arquivos/CSV (`parte4-arquivos`)
- `npm run test:mobile` — testes mobile (`parte5-mobile`)
- `npm run test:pyramid` — testes da pirâmide (`parte6-piramide`)
- `npm run test:mocks` — testes com mocks (`parte7-mocks`)
- `npm run test:ui` — interface do Playwright


## Observações

*  Para praticamente todas as questões, eu tenho situações parecidas (ou idênticas) reais na minha experiência, e que já produzi no passado. Resolvi utilizar eles como base, porém como foi pedido para manter objetivo, decidi deixar de fora os detalhes mais específicos de cada experiência. Por conta disso, alguns projetos podem ter um formato levemente diferente. Em uma das questões, por exemplo, eu já tinha uma solução idêntica a necessãria, porém estava em Jest, então reproduzi a mesma estrutura no Playwright.
*  A questão 2.1 é idêntica ao teste técnico que dou hoje na empresa em que estou, porém ela é direcionada à posição de QA Jr-Pleno. Decidi utilizar como projeto, um exemplo que tenho e uso para realizar a mentorias. Portanto, o projeto contém funcionalidades e dados adicionais
