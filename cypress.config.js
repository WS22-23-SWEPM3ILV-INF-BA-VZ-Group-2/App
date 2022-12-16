const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        ...process.env,
        ...config.env,
      }
      require('./cypress/plugins/index.js')(on, config)
      return config
    },
    reporterOptions: {
      overwrite: true,
      preserveSpecsDir: false,
      outputDir: 'coverage/xml-reports/',
    },
    env: {
      BASE_URL: 'http://localhost:19006',
    },
  },
})
