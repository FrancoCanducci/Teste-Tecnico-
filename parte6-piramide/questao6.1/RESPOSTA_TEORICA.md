6.1.a) Diferença entre testes E2E e testes de componentes
Testes de componente validam partes isoladas do sistema, como um campo ou validação específica, sendo mais rápidos e fáceis de debugar. Já E2E testa o fluxo completo do usuário, integrando tudo, mas é mais lento e mais sujeito a falhas externas.

6.1.b) Quando usar cada tipo?
Componentes eu uso para validar regras específicas e rapidamente, garantindo cobertura base. E2E eu uso para fluxos críticos (ex: checkout, login), garantindo que tudo funciona junto. A ideia é usar mais testes pequenos e poucos E2E bem escolhidos.
