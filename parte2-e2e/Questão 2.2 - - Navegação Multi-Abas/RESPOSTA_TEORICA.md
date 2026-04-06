2.2.a) Qual estratégia você usaria para manter referência entre as abas?
Armazenar explicitamente as referências das abas (pages) abertas, por exemplo salvando a página original e capturando a nova aba via evento (context.waitForEvent('page')). Assim posso alternar entre elas de forma controlada. 

2.2.b) Como você garantiria que os dados não se percam durante a execução?
Eu mantenho os dados importantes em variáveis dentro do teste ou em um contexto compartilhado, e evito depender da UI para recuperar informação. Também validaria em pontos críticos (ex: depois de trocar de aba) que os dados ainda estão lá. Em fluxo real, troca de aba ou reload pode resetar estado facilmente.

2.2.c) Como você lidaria com popups/modais que abrem em novas janelas?
Capturo esses eventos explicitamente. Quando é uma nova aba, eu escuto o evento de criação de página, e.g. context.waitForEvent('')) antes de clicar no elemento que abre o popup, garantindo que eu capture a nova referência corretamente. 