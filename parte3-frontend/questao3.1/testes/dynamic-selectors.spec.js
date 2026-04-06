const { test, expect } = require("@playwright/test");
const { DynamicContentPage } = require("./pages/dynamic-page.js");

test.describe("Questão 3.1 — Seletores dinâmicos (Dynamic Content)", () => {
  test("1. texto visível — heading e intro estáveis após refresh", async ({ page }) => {
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.goto();

    await expect(dynamicPage.headingByVisibleText()).toBeVisible();
    await expect(dynamicPage.introParagraphByPartialText()).toBeVisible();

    await page.reload();
    await expect(dynamicPage.headingByVisibleText()).toBeVisible();
    await expect(dynamicPage.introParagraphByPartialText()).toBeVisible();
  });

  test("2. estrutura DOM (nth-child) — mesma posição, texto diferente", async ({
    page,
  }) => {
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.goto();

    const textCol = dynamicPage.secondRowTextColumnByNth();
    const before = (await textCol.innerText()).trim();
    expect(before.length).toBeGreaterThan(10);

    await page.reload();
    const after = (await textCol.innerText()).trim();
    expect(after.length).toBeGreaterThan(10);
  });

  test("3. atributo parcial — avatares e link do rodapé", async ({ page }) => {
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.goto();

    await expect(dynamicPage.avatarImagesByPartialSrc()).toHaveCount(3);
    await expect(dynamicPage.footerLinkByPartialHref()).toBeVisible();

    await page.reload();
    await expect(dynamicPage.avatarImagesByPartialSrc()).toHaveCount(3);
    await expect(dynamicPage.footerLinkByPartialHref()).toBeVisible();
  });

  test("4. hierarquia (parent > child) — primeira coluna de texto", async ({
    page,
  }) => {
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.goto();

    const cell = dynamicPage.firstRowTextColumnByHierarchy();
    await expect(cell).toBeVisible();
    expect((await cell.innerText()).trim().length).toBeGreaterThan(10);

    await page.reload();
    await expect(cell).toBeVisible();
    expect((await cell.innerText()).trim().length).toBeGreaterThan(10);
  });

  test("5. XPath — terceira linha, coluna de texto", async ({ page }) => {
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.goto();

    const cell = dynamicPage.thirdRowTextColumnByXPath();
    await expect(cell).toBeVisible();
    expect((await cell.innerText()).trim().length).toBeGreaterThan(10);

    await page.reload();
    await expect(cell).toBeVisible();
  });

  test("múltiplos refreshes — três linhas dinâmicas sempre presentes", async ({
    page,
  }) => {
    const dynamicPage = new DynamicContentPage(page);
    await dynamicPage.goto();

    for (let i = 0; i < 5; i++) {
      await expect(dynamicPage.allDynamicRows()).toHaveCount(3);
      for (const row of await dynamicPage.allDynamicRows().all()) {
        await expect(row).toBeVisible();
        const textCol = row.locator("> div.large-10.columns");
        expect((await textCol.innerText()).trim().length).toBeGreaterThan(5);
      }
      await page.reload();
    }
  });
});
