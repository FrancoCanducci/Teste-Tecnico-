const { test, expect } = require("@playwright/test");

const FORM_URL = "https://demoqa.com/automation-practice-form";

async function openForm(page) {
  await page.goto(FORM_URL);
  await page.evaluate(() => {
    document.querySelector("#fixedban")?.remove();
    document.querySelector("footer")?.remove();
  });
}

test.describe("Questao 6.1 - Testes de componente (isolado)", () => {
  test("validacao de campo de email", async ({ page }) => {
    await openForm(page);

    const emailInput = page.locator("#userEmail");
    await emailInput.fill("email-invalido");
    await emailInput.blur();

    const isValid = await emailInput.evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);

    await emailInput.fill("qa.teste@email.com");
    await emailInput.blur();
    const isValidAfterFix = await emailInput.evaluate((el) => el.checkValidity());
    expect(isValidAfterFix).toBe(true);
  });

  test("validacao de campo de telefone", async ({ page }) => {
    await openForm(page);

    const phoneInput = page.locator("#userNumber");
    await phoneInput.fill("12345");
    await phoneInput.blur();
    let isValid = await phoneInput.evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);

    await phoneInput.fill("1198765432");
    await phoneInput.blur();
    isValid = await phoneInput.evaluate((el) => el.checkValidity());
    expect(isValid).toBe(true);
  });

  test("validacao de selecao de data", async ({ page }) => {
    await openForm(page);

    const dobInput = page.locator("#dateOfBirthInput");
    await dobInput.click();
    await dobInput.fill("10 Oct 1995");
    await dobInput.press("Enter");

    await expect(dobInput).toHaveValue("10 Oct 1995");
  });
});
