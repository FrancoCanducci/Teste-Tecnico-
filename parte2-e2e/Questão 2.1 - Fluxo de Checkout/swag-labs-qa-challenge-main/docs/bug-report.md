# Bug Report - Swag Labs V1
QA Technical Challenge

---

## Ambiente de Teste

- Sistema: Swag Labs V1
- Navegador: Google Chrome
- Versão: 145.0.7632.77
- Sistema Operacional: MacOS
- Data da Execução: 24/02/2026

---

## Resumo Executivo

Total de bugs identificados: 9

Distribuição por Severidade:
- Crítica: 2
- Alta: 4
- Média: 1
- Baixa: 2

Distribuição por Prioridade:
- P0: 3
- P1: 3
- P2: 2
- P3: 1

# Bugs Identificados

## BUG-001

**Título:** [Product Listing] Exposição de métodos internos na interface  

**Severidade:** Baixa  
**Prioridade:** P2 
**Caso de Teste Relacionado:** TC-01 
**Componente:** Product Listing / Product Details  
**Usuário:** standard_user e problem_user 
**Ambiente:** Google Chrome 145.0.7632.77  

### Descrição

A interface exibe métodos internos como parte do título e descrição de produtos.
Exemplos identificados:
- carry.allTheThings()
- Test.allTheThings T-Shirt (Red)

### Passos para Reproduzir

1. Realizar login com usuários `standard_user` / `problem_user` e senha `secret_sauce`.
2. Acessar a listagem de produtos.
3. Visualizar título e descrição dos produtos.

### Resultado Esperado

Exibição apenas de informações comerciais apropriadas.

### Resultado Atual

Métodos internos são exibidos na interface.

### Evidência Técnica

- `/docs/evidences/bug-001-productList-hardcoded.png`

---

## BUG-002

**Título:** [Layout] Footer não ocupa altura total da tela em resolução específica  

**Severidade:** Baixa  
**Prioridade:** P3  
**Caso de Teste Relacionado:** TC-01 
**Componente:** Product Details  
**Usuário:** standard_user e problem_user
**Ambiente:** Resolução 960x651 - Chrome 145.0.7632.77  

### Descrição

O footer não ocupa corretamente a base da tela ao visualizar produto em resolução 960x651.

### Passos para Reproduzir

1. Ajustar resolução do navegadr para 960x651.
2. Realizar login com usuários `standard_user` / `problem_user` e senha `secret_sauce`.
3. Acessar listagem.
4. Clicar para visualizar produto.

### Resultado Esperado

Footer deve se ajustar ao final do viewport.

### Resultado Atual

Footer exibido menor que a altura da tela.

### Evidência Técnica

- `/docs/evidences/bug-002-footer-layout.png`

---

## BUG-003

**Título:** [Checkout] Permite finalizar compra com carrinho vazio  

**Severidade:** Crítica  
**Prioridade:** P0 
**Caso de Teste Relacionado:** TC-01, TC-06
**Componente:** Checkout  
**Usuário:** standard_user  
**Ambiente:** Chrome 145.0.7632.77  

### Descrição

O sistema permite finalizar compra sem produtos adicionados ao carrinho.

### Passos para Reproduzir

1. Login com `standard_user` e senha `secret_sauce`.
2. Não adicionar produtos e clicar no carrinho.
3. Acessar checkout.
4. Preencher campos obrigatórios.
5. Finalizar compra.

### Resultado Esperado

Sistema deve impedir avanço sem itens no carrinho.

### Resultado Atual

Compra é finalizada com sucesso.

### Evidência Técnica

- `/docs/evidences/bug-004-empty-cart-checkout.mov`

---

## BUG-004

**Título:** [Product Listing] Mesma imagem exibida para todos os produtos  

**Severidade:** Alta  
**Prioridade:** P1
**Caso de Teste Relacionado:** TC-05 
**Componente:** Product Listing  
**Usuário:** problem_user  

### Passos para Reproduzir

1. Login com `problem_user` e senha `secret_sauce`.
2. Acessar listagem.

### Resultado Esperado

Cada produto deve exibir imagem correspondente.

### Resultado Atual

A mesma imagem é exibida para todos.

### Evidência Técnica

- `/docs/evidences/bug-004-same-image.png`

---

## BUG-005

**Título:** [Product Details] Produto incorreto exibido ao clicar no produto da listagem  

**Severidade:** Alta  
**Prioridade:** P0
**Caso de Teste Relacionado:** TC-05  
**Componente:** Product Details  
**Usuário:** problem_user  

### Passos para Reproduzir

1. Login com `problem_user` e senha `secret_sauce`.
2. Clicar em qualquer produto.

### Resultado Esperado

Produto selecionado deve ser exibido.

### Resultado Atual

Produto diferente é exibido.

### Evidência Técnica

- `/docs/evidences/bug-005-wrong-product.mov`

---

## BUG-006

**Título:** [Product Listing] Filtro da listagem de produtos não funciona  

**Severidade:** Média  
**Prioridade:** P2
**Caso de Teste Relacionado:** TC-05  
**Componente:** Product Listing  
**Usuário:** problem_user  

### Descrição

Ao clicar em qualquer opção do filtro da listagem nada acontece 

### Passos para Reproduzir

1. Login com `problem_user` e senha `secret_sauce`.
2. Selecionar qualquer opção do filtro

### Resultado Esperado

Sistema deve filtrar de acordo com a opção selecionada

### Resultado Atual

Nada acontece ao clicar em qualquer opção do filtro 

### Evidência Técnica

- `/docs/evidences/bug-006-filter.mov`

---

## BUG-007

**Título:** [Cart State] Inconsistência no gerenciamento de estado do carrinho para determinados produtos  

**Severidade:** Alta  
**Prioridade:** P1
**Caso de Teste Relacionado:** TC-05  
**Componente:** Product Listing / Product Details / Cart  
**Usuário:** problem_user  
**Ambiente:** Google Chrome 145.0.7632.77  

---

### Descrição

Foi identificada inconsistência no gerenciamento de estado do carrinho para determinados produtos ao utilizar o usuário `problem_user`.
O comportamento incorreto se manifesta em diferentes telas (listagem e página de detalhes), indicando possível falha estrutural no controle de estado ou identificação de produtos.

---

### Comportamentos Observados

1. Nem todos os produtos permitem ser adicionados ao carrinho na listagem.
2. Após adicionar determinados produtos, a opção de remoção não funciona corretamente.
3. Na página de descrição do produto, não é possível adicionar ou remover itens diretamente.
4. O estado exibido na página de detalhes não sincroniza corretamente com a listagem.

---

### Passos para Reproduzir

1. Realizar login com `problem_user` e senha `secret_sauce`.
2. Acessar a listagem de produtos.
3. Tentar adicionar todos os produtos ao carrinho.
4. Tentar remover produtos adicionados.
5. Acessar a página de descrição de um produto e tentar adicionar/remover.

---

### Resultado Esperado

- Todos os produtos devem permitir adição ao carrinho.
- Produtos adicionados devem poder ser removidos.
- O estado do carrinho deve permanecer consistente entre listagem, página de detalhes e carrinho.
- Botões devem refletir corretamente o estado atual do item.

---

### Resultado Atual

- Apenas alguns produtos podem ser adicionados.
- Alguns produtos não podem ser removidos após adição.
- Página de detalhes não permite manipulação direta do item.
- Estado do carrinho apresenta inconsistência entre telas.

---

### Evidência Técnica

- `/docs/evidences/bug-007-add-product-failure.mov`
- `/docs/evidences/bug-007-remove-failure.mov`
- `/docs/evidences/bug-007-product-detail-action.mov`
---

## BUG-008

**Título:** [Product Details] ITEM NOT FOUND ao acessar Sauce Labs Fleece Jacket  

**Severidade:** Alta  
**Prioridade:** P1
**Caso de Teste Relacionado:** TC-05  
**Componente:** Product Details  
**Usuário:** problem_user  
**Ambiente:** Google Chrome 145.0.7632.77  
**Relacionamento:** BUG-009  

### Descrição

Ao acessar o produto "Sauce Labs Fleece Jacket", o sistema exibe mensagem "ITEM NOT FOUND" e apresenta inconsistência no preço.

### Passos para Reproduzir

1. Login com `problem_user` e senha `secret_sauce`.
2. Na listagem, clicar em "Sauce Labs Fleece Jacket".

### Resultado Esperado

Sistema deve exibir a página correta do produto com informações consistentes.

### Resultado Atual

Mensagem "ITEM NOT FOUND" é exibida.
Preço aparece quebrado/inconsistente.

### Evidência Técnica

- `/docs/evidences/bug-008-item-not-found.png`

---

## BUG-009

**Título:** [Cart] Tela branca ao acessar carrinho com produto específico  

**Severidade:** Crítica  
**Prioridade:** P0
**Caso de Teste Relacionado:** TC-06, TC-05 
**Componente:** Cart  
**Usuário:** problem_user
**Relacionamento:** BUG-008  

### Passos para Reproduzir

1. Login com `problem_user` e senha `secret_sauce`.
2. Adicionar "Sauce Labs Fleece Jacket" ao carrinho.
3. Acessar carrinho.

### Resultado Esperado

Carrinho deve exibir itens normalmente.

### Resultado Atual

Tela branca é exibida.
Erro 503 e erro CORS no console.
TypeError identificado em index.js.

### Evidência Técnica

- `/docs/evidences/bug-009-white-screen-and-consoleError.mov`

