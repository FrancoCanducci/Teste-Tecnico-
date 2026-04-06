const fs = require("fs");
const path = require("path");

const DEFAULT_HEADERS = ["nome", "email", "idade", "cidade"];

const CITIES = [
  "Sao Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Porto Alegre",
  "Curitiba",
];

/**
 * Escapa valor para CSV simples.
 * @param {string | number} value
 * @returns {string}
 */
function escapeCsvValue(value) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Gera linhas de dados fake para o CSV.
 * @param {number} count
 * @returns {Array<{nome: string, email: string, idade: number, cidade: string}>}
 */
function generateRows(count) {
  return Array.from({ length: count }, (_, index) => {
    const n = index + 1;
    return {
      nome: `Pessoa ${n}`,
      email: `pessoa${n}@email.com`,
      idade: 18 + (n % 60),
      cidade: CITIES[index % CITIES.length],
    };
  });
}

/**
 * Cria string CSV no formato nome,email,idade,cidade.
 * @param {number} rowsCount
 * @returns {string}
 */
function generateCsvContent(rowsCount) {
  const lines = [DEFAULT_HEADERS.join(",")];
  const rows = generateRows(rowsCount);
  for (const row of rows) {
    lines.push(
      [
        escapeCsvValue(row.nome),
        escapeCsvValue(row.email),
        escapeCsvValue(row.idade),
        escapeCsvValue(row.cidade),
      ].join(",")
    );
  }
  return `${lines.join("\n")}\n`;
}

/**
 * Gera e salva um CSV em disco.
 * @param {string} targetPath
 * @param {number} rowsCount
 * @returns {string} path salvo
 */
function writeCsvFile(targetPath, rowsCount) {
  const dir = path.dirname(targetPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(targetPath, generateCsvContent(rowsCount), "utf8");
  return targetPath;
}

/**
 * Validação simplificada de importação CSV.
 * @param {string} csvContent
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateCsv(csvContent) {
  const errors = [];
  if (!csvContent || !csvContent.trim()) {
    return { valid: false, errors: ["CSV vazio"] };
  }

  const lines = csvContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    errors.push("CSV sem linhas de dados");
    return { valid: false, errors };
  }

  const header = lines[0].split(",");
  if (header.join(",") !== DEFAULT_HEADERS.join(",")) {
    errors.push("Cabecalho em formato incorreto");
    return { valid: false, errors };
  }

  const seenEmails = new Set();
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length !== DEFAULT_HEADERS.length) {
      errors.push(`Linha ${i + 1} com numero de colunas invalido`);
      continue;
    }
    const [nome, email, idade, cidade] = cols;
    if (!nome || !cidade) errors.push(`Linha ${i + 1} com campos obrigatorios vazios`);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push(`Linha ${i + 1} com email invalido`);
    }
    const idadeNum = Number.parseInt(idade, 10);
    if (Number.isNaN(idadeNum) || idadeNum < 0 || idadeNum > 120) {
      errors.push(`Linha ${i + 1} com idade invalida`);
    }
    if (seenEmails.has(email)) {
      errors.push(`Linha ${i + 1} com email duplicado`);
    } else {
      seenEmails.add(email);
    }
  }

  return { valid: errors.length === 0, errors };
}

module.exports = {
  DEFAULT_HEADERS,
  generateRows,
  generateCsvContent,
  writeCsvFile,
  validateCsv,
};
