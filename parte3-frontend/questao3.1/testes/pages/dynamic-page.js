/**
 * Page Object — https://the-internet.herokuapp.com/dynamic_content
 * Conteúdo muda a cada refresh; IDs/classes ExtJS fictícios são substituídos por
 * estratégias estáveis (texto fixo, estrutura, atributos parciais, hierarquia, XPath).
 */

const DYNAMIC_CONTENT_URL = "https://the-internet.herokuapp.com/dynamic_content";

class DynamicContentPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(DYNAMIC_CONTENT_URL);
  }

  /**
   * Região estável que envolve as três linhas dinâmicas (avatar + texto).
   * @returns {import('@playwright/test').Locator}
   */
  dynamicRowsContainer() {
    return this.page.locator(".example > div.row > div.large-10.columns.large-centered");
  }

  // --- 1. Por texto visível (rótulos estáticos que não mudam no refresh) ---

  /** Título da página — sempre "Dynamic Content". */
  headingByVisibleText() {
    return this.page.getByRole("heading", { name: "Dynamic Content" });
  }

  /** Parágrafo introdutório (trecho fixo). */
  introParagraphByPartialText() {
    return this.page.getByText("This example demonstrates", { exact: false });
  }

  // --- 2. Por estrutura DOM (nth-child / nth-of-type) ---

  /** Segunda linha dinâmica (texto muda; a posição na árvore não). */
  secondDynamicRowByNthChild() {
    return this.dynamicRowsContainer().locator("> div.row:nth-of-type(2)");
  }

  /** Coluna de texto da segunda linha (2º filho: avatar + texto). */
  secondRowTextColumnByNth() {
    return this.secondDynamicRowByNthChild().locator("> div.large-10.columns");
  }

  // --- 3. Por atributo parcial (src, href, class) ---

  /** Avatares vivem sob /img/avatars/ — padrão estável, nome do arquivo muda. */
  avatarImagesByPartialSrc() {
    return this.page.locator('img[src*="/img/avatars/"]');
  }

  /** Link do rodapé — href contém domínio estável. */
  footerLinkByPartialHref() {
    return this.page.locator('a[href*="elementalselenium.com"]');
  }

  // --- 4. Por hierarquia (ancestral > descendente) ---

  /** Primeira linha: `.example` > `.row` interno > coluna de texto (não o avatar). */
  firstRowTextColumnByHierarchy() {
    return this.dynamicRowsContainer()
      .locator("> div.row")
      .first()
      .locator("> div.large-10.columns");
  }

  // --- 5. Por XPath ---

  /** Terceira linha dinâmica, coluna de texto (conteúdo muda; caminho não). */
  thirdRowTextColumnByXPath() {
    return this.page.locator(
      "xpath=//div[contains(@class,'large-10') and contains(@class,'large-centered')]/div[@class='row'][3]/div[contains(@class,'large-10')]"
    );
  }

  /** Todas as linhas dinâmicas (esperado: 3). */
  allDynamicRows() {
    return this.dynamicRowsContainer().locator("> div.row");
  }
}

module.exports = {
  DynamicContentPage,
  DYNAMIC_CONTENT_URL,
};
