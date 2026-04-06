const { test, expect } = require("@playwright/test");

const FORM_URL = "https://demoqa.com/automation-practice-form";

async function openForm(page) {
  await page.goto(FORM_URL);
  await page.evaluate(() => {
    document.querySelector("#fixedban")?.remove();
    document.querySelector("footer")?.remove();
  });
}

test.describe("Questao 6.1 - E2E (fluxo completo)", () => {
  test("preencher, submeter e validar modal de confirmacao", async ({ page }) => {
    await openForm(page);

    await page.fill("#firstName", "Joao");
    await page.fill("#lastName", "Silva");
    await page.fill("#userEmail", "joao.silva@email.com");
    await page.locator("label[for='gender-radio-1']").click();
    await page.fill("#userNumber", "1199999888");

    await page.locator("#dateOfBirthInput").click();
    await page.locator("#dateOfBirthInput").fill("10 Oct 1995");
    await page.locator("#dateOfBirthInput").press("Enter");

    await page.locator("#subjectsInput").fill("Maths");
    await page.locator("#subjectsInput").press("Enter");

    await page.locator("label[for='hobbies-checkbox-1']").click(); // Sports
    await page.fill("#currentAddress", "Rua Teste, 123 - Sao Paulo");

    await page.locator("#state").click();
    await page.locator("#react-select-3-input").fill("NCR");
    await page.locator("#react-select-3-input").press("Enter");

    await page.locator("#city").click();
    await page.locator("#react-select-4-input").fill("Delhi");
    await page.locator("#react-select-4-input").press("Enter");

    await page.click("#submit");

    await expect(page.locator("#example-modal-sizes-title-lg")).toHaveText(
      "Thanks for submitting the form"
    );
    await expect(page.locator(".table-responsive")).toBeVisible();
    await expect(page.locator("td", { hasText: "Student Name" })).toBeVisible();
    await expect(page.locator("td", { hasText: "Joao Silva" })).toBeVisible();
    await expect(page.locator("td", { hasText: "Student Email" })).toBeVisible();
    await expect(page.locator("td", { hasText: "joao.silva@email.com" })).toBeVisible();
  });
});
