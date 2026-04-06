📁 Meu Repositório

Este repositório reúne diferentes abordagens de testes automatizados e aplicações auxiliares, organizadas de acordo com o tipo de teste, escopo e estratégia adotada. O objetivo é demonstrar na prática a aplicação de conceitos fundamentais de QA, incluindo testes de API, E2E, manipulação de arquivos, mocks, mobile e a pirâmide de testes.

A estrutura foi pensada para isolar responsabilidades, facilitar manutenção e permitir evolução independente de cada contexto de teste.

🧱 Estrutura do Projeto

A organização do repositório segue uma divisão por contexto de teste:

Pasta	Descrição
parte1-api/	Contém testes automatizados de API REST, cobrindo validação de endpoints, contratos, status codes e regras de negócio.
parte2-e2e/	Testes end-to-end utilizando Playwright, simulando o comportamento real do usuário em fluxos completos.
parte3-frontend/	Aplicação frontend utilizada como base para execução dos testes E2E.
parte4-arquivos/	Testes relacionados à leitura, validação e processamento de arquivos (ex: CSV).
parte5-mobile/	Estrutura voltada para testes mobile, considerando cenários e particularidades desse ambiente.
parte6-piramide/	Exemplos e organização de testes seguindo o conceito da pirâmide de testes (unitários, integração e E2E).
parte7-mocks/	Implementação de testes utilizando mocks e stubs para simulação de dependências externas.

Cada pasta é tratada como um módulo independente, podendo conter sua própria configuração, dependências e documentação específica.

⚙️ Execução de Testes

Os testes podem ser executados de forma isolada ou em conjunto, utilizando os scripts abaixo:

npm test
Executa todos os testes configurados no projeto (Playwright).
npm run test:api
Executa apenas os testes de API (parte1-api).
npm run test:e2e
Executa os testes end-to-end (parte2-e2e).
npm run test:files
Executa os testes relacionados a arquivos (parte4-arquivos).
npm run test:mobile
Executa os testes mobile (parte5-mobile).
npm run test:pyramid
Executa os testes organizados segundo a pirâmide de testes (parte6-piramide).
npm run test:mocks
Executa os testes que utilizam mocks e stubs (parte7-mocks).
npm run test:ui
Abre a interface gráfica do Playwright para execução e depuração dos testes.
🧪 Abordagem de Testes

Este repositório busca demonstrar uma visão prática e estruturada de QA, com foco em:

Separação clara entre tipos de teste
Reutilização de código e padronização
Testes independentes e previsíveis
Uso de mocks para controle de dependências externas
Cobertura de cenários reais de negócio
Execução automatizada e escalável

Sempre que possível, os testes foram organizados de forma a refletir boas práticas utilizadas em ambientes de produção.

📝 Observações

Grande parte dos cenários e estruturas apresentadas neste repositório é baseada diretamente em experiências reais de mercado, incluindo implementações já utilizadas em ambientes profissionais.

Para manter objetividade e clareza, optei por não incluir todos os detalhes específicos de cada contexto original. Como resultado, alguns projetos podem apresentar pequenas variações estruturais em relação às suas versões reais.

Em alguns casos, soluções já existentes foram adaptadas para atender aos requisitos propostos. Por exemplo, há cenários originalmente implementados em Jest que foram reproduzidos em Playwright, mantendo a mesma lógica e estrutura.

A seção 2.1 é baseada em um teste técnico que aplico atualmente para posições de nível Jr–Pleno. O projeto incluído aqui deriva de um material utilizado em mentorias, o que explica a presença de funcionalidades e dados adicionais além do escopo estritamente necessário.
