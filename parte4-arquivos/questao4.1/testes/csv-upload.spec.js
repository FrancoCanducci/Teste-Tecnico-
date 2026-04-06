const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const {
  generateCsvContent,
  writeCsvFile,
  validateCsv,
} = require("./utils/csv-generator.js");

const UPLOAD_URL = "https://the-internet.herokuapp.com/upload";

const fixturesDir = path.join(__dirname, "fixtures");
const generatedDir = path.join(fixturesDir, "generated");

async function uploadFileAndAssertSuccess(page, filePath) {
  await page.goto(UPLOAD_URL);
  await page.setInputFiles("#file-upload", filePath);
  await page.click("#file-submit");
  await expect(page.locator("h3")).toHaveText("File Uploaded!");
  await expect(page.locator("#uploaded-files")).toContainText(path.basename(filePath));
}

test.describe("Questao 4.1 - Importacao de CSV", () => {
  test("gerador CSV: cria 10, 100 e 1000 linhas", async () => {
    const cases = [10, 100, 1000];
    for (const size of cases) {
      const filePath = path.join(generatedDir, `dados-${size}.csv`);
      writeCsvFile(filePath, size);
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.trim().split(/\r?\n/);
      expect(lines.length).toBe(size + 1); // +1 cabecalho
      expect(lines[0]).toBe("nome,email,idade,cidade");
      expect(validateCsv(content).valid).toBe(true);
    }
  });

  test("upload de CSV valido (fixture)", async ({ page }) => {
    const filePath = path.join(fixturesDir, "valido.csv");
    const content = fs.readFileSync(filePath, "utf8");
    expect(validateCsv(content).valid).toBe(true);
    await uploadFileAndAssertSuccess(page, filePath);
  });

  test("upload de CSV valido (gerado dinamicamente - 1000 linhas)", async ({ page }) => {
    const filePath = path.join(generatedDir, "valido-1000.csv");
    writeCsvFile(filePath, 1000);
    const content = fs.readFileSync(filePath, "utf8");
    expect(validateCsv(content).valid).toBe(true);
    await uploadFileAndAssertSuccess(page, filePath);
  });

  test("CSV vazio e invalido", async ({ page }) => {
    const filePath = path.join(fixturesDir, "vazio.csv");
    const content = fs.readFileSync(filePath, "utf8");
    const result = validateCsv(content);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("CSV vazio");

    // A pagina de exemplo aceita o arquivo, mas nosso validador barra o conteudo.
    await uploadFileAndAssertSuccess(page, filePath);
  });

  test("CSV com formato incorreto e invalido", async ({ page }) => {
    const filePath = path.join(fixturesDir, "formato-incorreto.csv");
    const content = fs.readFileSync(filePath, "utf8");
    const result = validateCsv(content);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Cabecalho em formato incorreto");

    await uploadFileAndAssertSuccess(page, filePath);
  });

  test("CSV com dados malformados e invalido", async ({ page }) => {
    const filePath = path.join(fixturesDir, "dados-malformados.csv");
    const content = fs.readFileSync(filePath, "utf8");
    const result = validateCsv(content);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors.join(" | ")).toContain("email invalido");

    await uploadFileAndAssertSuccess(page, filePath);
  });

  test("conteudo dinamico com duplicata e invalido", async () => {
    const badCsv = [
      "nome,email,idade,cidade",
      "Pessoa A,pessoa@email.com,25,Sao Paulo",
      "Pessoa B,pessoa@email.com,28,Rio de Janeiro",
    ].join("\n");
    const result = validateCsv(badCsv);
    expect(result.valid).toBe(false);
    expect(result.errors.join(" | ")).toContain("email duplicado");
  });

  test("conteudo gerado base atende regras de negocio", async () => {
    const csv = generateCsvContent(100);
    const result = validateCsv(csv);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
