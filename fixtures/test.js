/**
 * Project fixtures
 *
 * Why this exists:
 * - Specs should read like test cases (intent-focused), not wiring code.
 * - Centralizing Page Object construction makes it trivial to share setup patterns
 *   and evolve the framework without editing every spec.
 */

const base = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { RegisterPage } = require('../pages/register.page');
const { ForgotPasswordPage } = require('../pages/forgot-password.page');
const { ProductsPage } = require('../pages/products.page');

// Extend Playwright's base `test` with our Page Objects.
// (Each test gets a fresh `page` by default, so these are safe and isolated.)
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  }
});

module.exports = {
  test,
  expect: base.expect
};
