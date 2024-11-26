// cypress.config.js
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5174", // adjust if your app runs on a different port
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
