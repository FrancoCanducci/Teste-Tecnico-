const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://www.saucedemo.com/",
    trashAssetsBeforeRuns: true,
  },
  allowCypressEnv: false,
  screenshotOnRunFailure: true,
  video: true,
  
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: false
  }
});
