# Test Cases - Swag Labs V1
QA Technical Challenge

---

## Visão Geral

Os testes foram estruturados considerando:

- Fluxo crítico de conversão (checkout end-to-end)
- Validações obrigatórias
- Manipulação de estado (carrinho)
- Consistência de dados entre etapas
- Comportamentos inesperados com usuário problem_user

---

# TC-01 - Fluxo Completo de Compra (standard_user)

## Objetivo
Validar o fluxo end-to-end de compra com usuário funcional.

## Usuário
standard_user

## Cobertura
- Login válido
- Adição de múltiplos produtos
- Persistência no carrinho
- Preenchimento correto de dados obrigatórios
- Consistência de valores no Overview
- Finalização com sucesso

| Etapa        | Ação Executada                          | Resultado Esperado |
|--------------|------------------------------------------|-------------------|
| Login        | Informar credenciais válidas             | Redirecionamento para lista |
| Lista        | Adicionar 3 produtos distintos           | Contador atualizado |
| Carrinho     | Acessar carrinho                         | Itens corretos exibidos |
| Informations | Preencher todos os campos obrigatórios   | Botão Continue habilitado |
| Overview     | Validar produtos e total com taxas       | Valores consistentes |
| Finish       | Finalizar compra                         | Mensagem "Thank you for your order!" |

---

# TC-02 - Validação de Campos Obrigatórios

## Objetivo
Garantir que os campos obrigatórios na etapa de Informations sejam devidamente validados.

## Usuário
standard_user

## Cenários Validados

| Cenário | Ação | Resultado Esperado |
|---------|------|-------------------|
| Todos vazios | Clicar em Continue sem preencher | Exibir erro "Error: First Name is required" |
| First Name vazio | Preencher demais campos | Exibir erro correspondente |
| Last Name vazio | Preencher demais campos | Exibir erro correspondente |
| Postal Code vazio | Preencher demais campos | Exibir erro correspondente |

---

# TC-03 - Manipulação de Carrinho

## Objetivo
Validar integridade do estado do carrinho.

## Usuário
standard_user

| Cenário | Ação | Resultado Esperado |
|----------|------|-------------------|
| Remoção de item | Remover produto do carrinho | Item removido corretamente |
| Continue Shopping | Retornar à lista | Produtos permanecem no carrinho |
| Persistência | Navegar entre páginas | Itens continuam salvos |

---

# TC-04 - Consistência de Dados no Overview

## Objetivo
Validar integridade de dados antes da finalização.

## Usuários
standard_user e problem_user

| Validação | Resultado Esperado |
|-----------|-------------------|
| Produtos listados | Devem corresponder ao carrinho |
| Quantidade | Deve refletir seleção anterior |
| Total | Deve incluir frete corretamente |
| Informações de pagamento | Devem estar exibidas |

---

# TC-05 - Fluxo completo com Usuário problem_user

## Objetivo
Identificar comportamentos inconsistentes ou falhas funcionais.

## Usuário
problem_user

## Cobertura

- Problemas visuais na listagem
- Inconsistência de imagens
- Falhas de layout
- Possíveis erros no Console
- Problemas de navegação

| Etapa | Comportamento Observado |
|--------|------------------------|
| Lista | Verificar imagens e layout |
| Carrinho | Validar consistência de dados |
| Checkout | Validar estabilidade do fluxo |
| DevTools | Monitorar Console e Network |

---

# TC-06 - Testes Exploratórios Guiados

## Objetivo
Identificar falhas fora do fluxo tradicional.

## Sessões Realizadas

- Navegação fora da ordem esperada
- Uso do botão voltar do navegador
- Refresh durante checkout
- Tentativa de finalizar sem produtos
- Múltiplos cliques rápidos
- Inserção de caracteres especiais nos campos

---

## Observação

Os bugs identificados durante a execução estão documentados em:
`bug-report.md`
