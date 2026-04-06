# 📁 Teste Técnico
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

## Scripts

- `npm test` — executa todos os testes Playwright
- `npm run test:api` — testes de API (`parte1-api`)
- `npm run test:e2e` — testes E2E (`parte2-e2e`)
- `npm run test:files` — testes de arquivos/CSV (`parte4-arquivos`)
- `npm run test:mobile` — testes mobile (`parte5-mobile`)
- `npm run test:pyramid` — testes da pirâmide (`parte6-piramide`)
- `npm run test:mocks` — testes com mocks (`parte7-mocks`)
- `npm run test:ui` — interface do Playwright


## 🧪 Abordagem de Testes

Este projeto segue algumas práticas importantes:

Separação por tipo de teste
Testes independentes e previsíveis
Reutilização de código
Uso de mocks para isolamento
Cobertura de cenários reais
Estrutura escalável

## 📝 Observações

Grande parte dos cenários apresentados é baseada em experiências reais de mercado, incluindo implementações já utilizadas em ambiente profissional.

Para manter objetividade, alguns detalhes específicos foram omitidos, e parte da estrutura foi padronizada entre os projetos. Por isso, podem existir pequenas diferenças em relação às implementações originais.

Em alguns casos, adaptei soluções já existentes para o contexto solicitado. Por exemplo, cenários originalmente desenvolvidos em Jest foram reproduzidos em Playwright, mantendo a mesma lógica.

A seção 2.1 é baseada diretamente em um teste técnico que aplico atualmente para níveis Jr–Pleno. O projeto utilizado aqui deriva de um material de mentoria, podendo conter funcionalidades e dados adicionais além do escopo solicitado.
