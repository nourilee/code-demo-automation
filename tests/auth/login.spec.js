/**
 * Login coverage
 *
 * Specs intentionally focus on user-observable behavior and navigation.
 * Credentials are pulled from `utils/credentials` to keep test logic clean.
 */
const { test, expect } = require('../../fixtures/test');
const { validUser } = require('../../utils/credentials');

test.describe('Login', () => {
  test('password is hidden by default and can be toggled', async ({ loginPage }) => {
    await loginPage.goto();

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await loginPage.passwordInput.fill('wowTesting123!');
    await loginPage.togglePasswordVisibility();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('navigates to Create Account via link', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.createAccountLink.click();
    await expect(loginPage.page).toHaveURL(/\/auth\/register/);
  });

  test('navigates to Forgot Password via link', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.forgotPasswordLink.click();
    await expect(loginPage.page).toHaveURL(/\/auth\/forgot/);
  });

  test('logs in successfully and reaches dashboard (products)', async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await productsPage.assertOnPage(expect);
  });

  test('shows an error for incorrect password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(validUser.username, 'wrong-password');

    // The app uses toast-style alerts; asserting on role keeps this stable.
    await expect(loginPage.toast).toBeVisible();
    await expect(loginPage.toast).toContainText(/error|invalid|failed/i);
  });
});
