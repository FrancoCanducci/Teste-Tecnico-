const { test, expect } = require("@playwright/test");
const { WindowManager } = require("./utils/window-manager");

const URL = "https://demoqa.com/browser-windows";

test.describe("Questao 2.2 - Navegacao Multi-Abas", () => {
  test("fluxo completo com abas e janelas", async ({ page, context }) => {
    const manager = new WindowManager(context);

    await page.goto(URL);

    // --- NOVA ABA ---
    const newTab = await manager.openNewPage(() =>
      page.click("#tabButton")
    );

    await expect(newTab.locator("#sampleHeading")).toHaveText(
      "This is a sample page"
    );

    // voltar para aba original
    await manager.switchTo(page);

    // --- NOVA JANELA ---
    const newWindow = await manager.openNewPage(() =>
      page.click("#windowButton")
    );

    await expect(newWindow.locator("#sampleHeading")).toHaveText(
      "This is a sample page"
    );

    // voltar para original
    await manager.switchTo(page);
  });
});