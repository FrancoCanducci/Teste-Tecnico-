class WindowManager {
  constructor(context) {
    this.context = context;
  }

  /**
   * Abre nova aba/janela e retorna a referência
   * @param {Function} action - ação que dispara abertura
   */
  async openNewPage(action) {
    const [newPage] = await Promise.all([
      this.context.waitForEvent("page"),
      action(),
    ]);

    await newPage.waitForLoadState();
    return newPage;
  }

  /**
   * Alterna para uma página existente
   * @param {import('@playwright/test').Page} page
   */
  async switchTo(page) {
    await page.bringToFront();
  }
}

module.exports = {
  WindowManager,
};