4.1.a) Como validaria que todas as 1000 linhas foram processadas corretamente?
Eu validaria em múltiplos níveis: primeiro garantindo que o arquivo tem 1000 linhas, depois verificando retorno do sistema (ex: quantidade processada), e idealmente validando no backend (ex: banco ou API) se os dados foram realmente inseridos. Só validar upload não garante que foi processado corretamente.

4.1.b) Como testaria cenários de erro (arquivo corrompido, dados inválidos)?
Eu criaria arquivos específicos simulando cada erro: CSV vazio, formato errado, dados inválidos, duplicados etc. Depois validaria se o sistema retorna erros claros e não processa dados inválidos. 
