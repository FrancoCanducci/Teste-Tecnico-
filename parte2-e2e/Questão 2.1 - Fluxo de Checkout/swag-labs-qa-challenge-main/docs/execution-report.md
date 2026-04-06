# 📊 Relatório de Execução de Testes (Execution Summary)

**Sistema:** Swag Labs V1  
**Data da Execução:** 24/02/2026  
**QA Responsável:** Amanda L.  
**Ambiente:** MacOS | Google Chrome 145.0.7632.77  

---

## 1. Resumo da Execução

Foram executados 6 casos de teste cobrindo o fluxo crítico de e-commerce (login, catálogo, carrinho, checkout e finalização).

Resultado da execução:
- 3 Casos PASS
- 3 Casos FAIL

As falhas identificadas impactam regras de negócio, consistência de dados e estabilidade da aplicação.

---

## 2. Status por Caso de Teste

| ID | Caso de Teste | Status | Observação |
|----|---------------|--------|------------|
| TC-01 | Fluxo Completo (standard_user) | ❌ FAIL | Violação de regra de negócio (checkout vazio – BUG-003). |
| TC-02 | Validação de Campos Obrigatórios | ✅ PASS | Validações funcionando conforme esperado. |
| TC-03 | Manipulação de Carrinho | ✅ PASS | Validações funcionando conforme esperado. |
| TC-04 | Consistência no Overview | ✅ PASS | Totais e cálculos corretos para standard_user. |
| TC-05 | Fluxo problem_user | ❌ FAIL | Múltiplas falhas funcionais e erro crítico (BUG-009). |
| TC-06 | Testes Exploratórios Guiados | ❌ FAIL | Identificada falha crítica no checkout (BUG-003). |

---

## 3. Cobertura Realizada

### Funcionalidades Exercitadas
- Autenticação
- Listagem e filtro de produtos
- Manipulação de carrinho
- Checkout (Informations e Overview)
- Finalização de compra

### Abordagem
- Testes funcionais baseados em fluxo
- Validações negativas
- Testes exploratórios guiados
- Análise técnica via DevTools (Console e Network)

---

## 4. Avaliação de Risco

A execução evidenciou:
- Violação de regra fundamental de negócio (checkout sem produto)
- Inconsistência estrutural no gerenciamento de estado do carrinho
- Falha crítica de disponibilidade (Erro 503 / tela branca)
- Inconsistência de dados de produto

### Distribuição por Severidade

| Severidade | Quantidade | Impacto Principal |
|------------|------------|------------------|
| Crítica | 2 | Indisponibilidade do carrinho e violação de regra de negócio crítica |
| Alta | 4 | Inconsistência de dados e falhas no gerenciamento de estado |
| Média | 1 | Funcionalidade secundária comprometida (filtro) |
| Baixa | 2 | Problemas visuais e exposição técnica |

---

## 5. Veredito por Perfil de Usuário

### standard_user
Fluxo executável do início ao fim.
Entretanto, há vulnerabilidade relevante de regra de negócio.

Status: Aprovado com ressalva: Risco de integridade financeira devido ao BUG-003 (Checkout de valor zero).

### problem_user
Falhas estruturais comprometem integridade de dados, estabilidade e conclusão da jornada.

Status: Reprovado para liberação.

---

## 6. Recomendação para Liberação

A versão não é recomendada para liberação enquanto existirem:
- Bugs classificados como P0
- Falhas de indisponibilidade (Erro 503)
- Violação de regra de negócio no checkout

Sugere-se:
- Correção prioritária dos P0
- Revisão do gerenciamento de estado
- Validação do tratamento de exceções
- Nova rodada completa de testes regressivos após correção