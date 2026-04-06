# Test Plan - Swag Labs V1
QA Technical Challenge

---

## 1. Objetivo

Definir a estratégia de validação do fluxo crítico de compra da aplicação Swag Labs V1, garantindo integridade funcional, consistência de dados e estabilidade comportamental.

---

## 2. Escopo

### Dentro do Escopo

- Fluxo completo de compra (end-to-end)
- Validação de campos obrigatórios
- Manipulação de carrinho (adição e remoção de itens)
- Consistência de dados entre etapas do checkout
- Comportamento com usuário padrão e usuário com falhas
- Análise técnica via DevTools (Console e Network)

### Fora de Escopo

- Testes de carga e performance
- Testes de segurança avançados
- Compatibilidade entre navegadores
- Testes mobile
- Integrações externas

---

## 3. Estratégia de Teste

A abordagem adotada combina três camadas complementares:

### 3.1 Testes Funcionais Baseados em Fluxo

Validação do fluxo crítico de compra ponta a ponta para garantir que o comportamento esperado seja mantido do login à finalização do pedido.

### 3.2 Testes Exploratórios Guiados

Sessões exploratórias com foco em:

- Navegação fora da sequência esperada
- Manipulação de URL
- Atualização de página durante o checkout
- Submissão de formulários inválidos
- Ações repetitivas (múltiplos cliques)
- Comportamentos inconsistentes com usuário problem_user

Objetivo: identificar falhas não previstas nos roteiros principais.

### 3.3 Validação Técnica

Análise utilizando DevTools para:

- Erros JavaScript (Console)
- Falhas de requisição HTTP (Network)
- Inconsistências de DOM e CSS

---

## 4. Abordagem Baseada em Risco

O foco principal está no fluxo de conversão (checkout), por ser a funcionalidade de maior impacto para o negócio.

Riscos priorizados:

- Finalização indevida de compra
- Falhas de validação obrigatória
- Inconsistência de valores e totais
- Problemas que impactem a experiência do usuário

---

## 5. Critério de Severidade

| Severidade | Descrição |
|------------|-----------|
| Crítica | Indisponibilidade do sistema ou falha que compromete integridade de dados ou conclusão da compra. |
| Alta | Afeta regras de negócio ou compromete a jornada principal, mas há contorno parcial. |
| Média | Impacta funcionalidade secundária ou experiência, sem bloquear o fluxo principal. |
| Baixa | Problemas visuais ou comportamentos não críticos. |

---

## 6. Critério de Prioridade

A prioridade foi definida considerando impacto no negócio, risco de bloqueio do fluxo de conversão e estabilidade da aplicação.

| Prioridade | Definição | Exemplo |
|------------|-----------|---------|
| P0 - Imediata | Bloqueia fluxo crítico ou torna o sistema inutilizável | Checkout finaliza sem produto / Tela branca com erro 503 |
| P1 - Alta | Impacta funcionalidade principal, mas há alternativa parcial | Campo obrigatório não funciona / Perda de sessão |
| P2 - Média | Impacta experiência ou comportamento secundário | Filtro não ordena corretamente / Navegação inconsistente |
| P3 - Baixa | Problemas visuais ou não críticos | Ajuste de layout / Footer desalinhado |

---

## 7. Entregáveis

- Documentação de casos executados
- Relatório estruturado de bugs
- Relatório da execução com Evidências técnicas
- Automação do fluxo crítico

---

## 8. Considerações Finais

A estratégia prioriza cobertura do fluxo essencial de e-commerce e identificação de riscos funcionais e técnicos que possam comprometer a experiência do usuário ou a confiabilidade da aplicação.