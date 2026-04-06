7.1.a) Como você testaria essas integrações sem afetar os ambientes reais?
Eu usaria mocks ou ambientes isolados (sandbox), nunca chamando APIs reais em testes automatizados. Isso evita custo, instabilidade e efeitos colaterais (tipo criar pedidos reais sem querer).

7.1.b) Como implementaria uma estratégia de mock para simular respostas?
Eu criaria um mock server que simula diferentes cenários: sucesso, erro, timeout, rate limit. Assim consigo testar comportamento da aplicação em várias situações controladas. 
