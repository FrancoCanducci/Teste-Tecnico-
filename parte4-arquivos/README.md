# Parte 4 - Testes com arquivos

## Questao 4.1 - Importacao de CSV

- Suite: `questao4.1/testes/csv-upload.spec.js`
- Gerador: `questao4.1/testes/utils/csv-generator.js`
- Fixtures: `questao4.1/testes/fixtures/`

### Cobertura

- Geracao de CSV com 10, 100 e 1000 linhas
- Upload de arquivo valido
- Casos invalidos: CSV vazio, formato incorreto e dados malformados
- Validacao de upload bem-sucedido na pagina alvo
- Validacao de regras de importacao no codigo (cabecalho, formato, email, idade, duplicatas)

### Execucao

```bash
npm run test:files
```
