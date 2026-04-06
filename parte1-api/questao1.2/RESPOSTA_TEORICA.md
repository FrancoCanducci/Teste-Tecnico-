1.2.a) Como você implementaria um mecanismo de refresh token automático?
Eu criaria uma camada central de autenticação que guarda o token junto com o momento em que ele foi gerado. No caso, antes de cada requisição autenticada, essa camada verifica se o token já expirou ou está próximo de expirar, e se estiver, faz automaticamente um novo login para obter um token novo

1.2.b) Como você garantiria que testes executados em paralelo não conflitem no gerenciamento de tokens?
Eu isolaria o gerenciamento de token por execução paralela, por exemplo criando uma instância separada de AuthManager para cada worker. Além disso, dentro de cada instância eu usaria algum mecanismo de sincronização (tipo uma fila ou promise chain) para evitar uma situação de race condition. 
