2.1.a) Como você garantiria que cada execução de teste use um cupom válido diferente?
Eu faria isso dinamicamente, gerando ou buscando cupons válidos a cada execução. Dependendo do sistema, dá pra criar o cupom via API antes do teste ou manter um pool de cupons e consumir um por execução. Na prática, já precisei resolver esse problema usando múltiplos cupons com a mesma regra de negócio (ex: primeira compra).

2.1.b) Como você validaria a confirmação do pedido sem depender de email real?
Eu validaria direto na aplicação ou via API, por exemplo verificando se o pedido foi criado com sucesso, se aparece na tela de confirmação ou thank-you. Outra opção é mockar o serviço de email e validar que ele foi chamado corretamente. Fica complicado depender de email, deixa o teste lento, instável e difícil de manter.
