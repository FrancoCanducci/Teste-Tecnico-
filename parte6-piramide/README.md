# Form Tests — Component vs E2E (Playwright)

Este projeto demonstra a diferença prática entre **testes de componente** e **testes end-to-end (E2E)** utilizando Playwright.

A aplicação utilizada é:
https://demoqa.com/automation-practice-form

---

## Objetivo

Comparar abordagens de teste:

* **Testes de componente (isolados)** → validam partes específicas do sistema
* **Testes E2E (fluxo completo)** → validam o comportamento do usuário do início ao fim

---

## Requisitos

* Node.js (versão 16 ou superior)
* npm

---

## Estrutura do Projeto

```id="3zj9k2"
.
├── component.spec.js   # Testes de componente (isolados)
├── e2e.spec.js         # Testes E2E (fluxo completo)
```

---

## Testes implementados

### Testes de componente (`component.spec.js`)

Focados em validar comportamentos específicos de campos individuais, sem depender do fluxo completo.

Cobertura:

* **Validação de email**

  * Input inválido → inválido
  * Input válido → válido

* **Validação de telefone**

  * Número incompleto → inválido
  * Número válido → válido

* **Seleção de data**

  * Preenchimento direto do campo
  * Validação do valor aplicado

---

### 🔹 Teste E2E (`e2e.spec.js`)

Valida o fluxo completo de um usuário preenchendo e enviando o formulário.

Cobertura:

* Preenchimento de todos os campos obrigatórios
* Seleção de gênero, data, estado e cidade
* Submissão do formulário
* Validação do modal de confirmação:

  * Título correto
  * Dados do usuário exibidos corretamente

Esse teste garante que:

* Todas as partes do sistema funcionam juntas
* O fluxo real do usuário está íntegro

---

## 🧩 Estratégia utilizada

### Remoção de elementos que interferem no teste

Antes da execução, elementos como banner e footer são removidos via `page.evaluate` para evitar interferência visual ou de interação:

````js
document.querySelector("#fixedban")?.remove();
document.querySelector("footer")?.remove();
``` id="x9k3lm"

---

## 🚀 Como rodar o projeto

### 1. Inicializar o projeto (caso necessário)

```bash
npm init -y
````

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

## Boas práticas aplicadas

* Separação clara entre testes de componente e E2E
* Validação direta via API nativa do browser (`checkValidity`)
* Evitar dependência de UI desnecessária nos testes de componente
* Uso de seletores diretos e objetivos
* Testes determinísticos e independentes


