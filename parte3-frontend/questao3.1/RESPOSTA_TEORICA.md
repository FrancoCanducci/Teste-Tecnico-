3.1.a) Quais estratégias você utilizaria para localizar elementos de forma confiável?
Eu priorizaria seletores estáveis como texto visível, roles ou atributos customizados tipo id.Se não tiver isso, fallback como hierarquia ou atributos parciais. Em absoluto último caso, já precisei utilizar localização (posição na tela ou índice) quando não tive uma identificação confiável o suficiente.

3.1.b) Como você lidaria com componentes renderizados condicionalmente?
Eu sempre esperaria explicitamente o elemento aparecer antes de interagir (waitFor, toBeVisible). Também valido se ele deve ou não existir dependendo do cenário. Isso evita flakiness, principalmente em telas que dependem de loading ou regras de negócio.

3.1.c) Como identificar 1 botão específico entre 5 botões "Salvar" idênticos?
Eu usaria o contexto: por exemplo, pegar o botão dentro de um container específico (um formulário, modal, linha da tabela). Se necessário, combino seletor com texto + posição ou hierarquia. 
