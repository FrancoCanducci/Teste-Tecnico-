5.1.a) Qual ferramenta você escolheria e por quê?
Eu escolheria Appium se precisar suportar iOS e Android com o mesmo framework, porque ele é mais flexível e padrão de mercado. 

5.1.b) Como você mockaria geolocalização em testes automatizados?
Eu usaria recursos do emulador ou comandos do driver (ex: Appium) para definir latitude e longitude. Em Android, por exemplo, dá pra usar comandos de shell. Isso permite simular cenários reais como usuário em outra cidade sem depender de localização real.

5.1.c) Estratégia para executar mesmos testes em iOS e Android?
Eu manteria os testes abstratos e configuraria capabilities diferentes para cada plataforma. O ideal é reutilizar o máximo possível e só tratar diferenças específicas (selectors ou comportamento). Assim você roda a mesma suíte em ambos com pouca duplicação.
