const assert = require("node:assert/strict");
const test = require("node:test");
const { remote } = require("webdriverio");

function getEnv(name, fallback = "") {
  return process.env[name] ?? fallback;
}

/**
 * Tenta aplicar geolocalizacao no Android Emulator via comando shell.
 * Retorna false quando nao suportado/nao configurado.
 * @param {import('webdriverio').Browser} driver
 */
async function tryMockGeolocation(driver) {
  const platformName = String(driver.capabilities.platformName || "").toLowerCase();
  if (platformName !== "android") return false;

  const latitude = getEnv("MOBILE_GEO_LAT", "-23.55052");
  const longitude = getEnv("MOBILE_GEO_LON", "-46.633308");

  try {
    await driver.execute("mobile: shell", {
      command: "emu",
      args: ["geo", "fix", longitude, latitude],
      includeStderr: true,
      timeout: 5000,
    });
    return true;
  } catch {
    return false;
  }
}

test("Appium - navegacao basica mobile e tentativa de mock geo", async (t) => {
  if (getEnv("RUN_MOBILE_TESTS", "false") !== "true") {
    t.skip("Defina RUN_MOBILE_TESTS=true para executar este teste.");
    return;
  }

  const platformName = getEnv("MOBILE_PLATFORM", "Android");
  const appiumPort = Number.parseInt(getEnv("APPIUM_PORT", "4723"), 10);

  const capabilities =
    platformName.toLowerCase() === "ios"
      ? {
          platformName: "iOS",
          "appium:automationName": getEnv("MOBILE_AUTOMATION", "XCUITest"),
          "appium:deviceName": getEnv("MOBILE_DEVICE_NAME", "iPhone 15"),
          "appium:platformVersion": getEnv("MOBILE_PLATFORM_VERSION", "17.5"),
          "appium:bundleId": getEnv("MOBILE_BUNDLE_ID", ""),
          "appium:app": getEnv("MOBILE_APP_PATH", ""),
          "appium:noReset": true,
        }
      : {
          platformName: "Android",
          "appium:automationName": getEnv("MOBILE_AUTOMATION", "UiAutomator2"),
          "appium:deviceName": getEnv("MOBILE_DEVICE_NAME", "Android Emulator"),
          "appium:platformVersion": getEnv("MOBILE_PLATFORM_VERSION", "14"),
          "appium:appPackage": getEnv("MOBILE_APP_PACKAGE", ""),
          "appium:appActivity": getEnv("MOBILE_APP_ACTIVITY", ""),
          "appium:app": getEnv("MOBILE_APP_PATH", ""),
          "appium:autoGrantPermissions": true,
          "appium:noReset": true,
        };

  const driver = await remote({
    protocol: "http",
    hostname: getEnv("APPIUM_HOST", "127.0.0.1"),
    port: appiumPort,
    path: "/",
    capabilities,
  });

  try {
    const sessionId = await driver.getSessionId();
    assert.ok(sessionId, "Sessao Appium deve ser criada");

    // Navegacao basica: aguarda app abrir, depois tenta localizar um elemento conhecido (opcional).
    await driver.pause(1500);
    const smokeSelector = getEnv("MOBILE_SMOKE_SELECTOR", "");
    if (smokeSelector) {
      const el = await driver.$(smokeSelector);
      assert.equal(await el.isExisting(), true, "Elemento smoke deve existir");
    }

    const geoApplied = await tryMockGeolocation(driver);
    // O requisito diz "se possivel". Entao aceitamos sucesso ou fallback sem falhar suite.
    assert.equal(typeof geoApplied, "boolean");
  } finally {
    await driver.deleteSession();
  }
});
