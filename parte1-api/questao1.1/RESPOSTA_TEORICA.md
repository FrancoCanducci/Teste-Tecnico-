
 1.1.a) Como você estruturaria seus testes automatizados para validar que o rate limiting está funcionando corretamente?
 Estruturaria os testes cobrindo cenários abaixo, no limite e acima do rate limit, enviando requisições sequenciais e paralelas para garantir precisão, além de validar o reset da janela de tempo (ex: após 1 min) usando controle de tempo quando possível.


1.1.b) Como você testaria o comportamento da API quando o limite é excedido?
Excederia o limite intencionalmente e validaria o retorno 429, presença de headers como Retry-After, bloqueio contínuo durante o período e liberação correta após o tempo de reset.
