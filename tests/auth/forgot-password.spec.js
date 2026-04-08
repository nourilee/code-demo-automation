/**
 * Forgot Password coverage
 *
 * These tests validate the browser-visible flow (form state + feedback toast).
 * Mailbox/link validation is out of scope because the target app UI does not
 * expose a reset link for an end-to-end browser journey.
 */
const { test, expect } = require('../../fixtures/test');
const { forgotPassword } = require('../../utils/credentials');

test.describe('Forgot Password', () => {
  test('email is required before submitting', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await expect(forgotPasswordPage.submitButton).toBeDisabled();
    await forgotPasswordPage.emailInput.fill('user@email.com');
    await expect(forgotPasswordPage.submitButton).toBeEnabled();
  });

  test('submitting a registered email shows success', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.requestReset(forgotPassword.registeredEmail);

    await expect(forgotPasswordPage.alert).toBeVisible();
    await expect(forgotPasswordPage.alert).toContainText(/success/i);
  });

  test('Back to Login navigates to the login screen', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.backToLoginLink.click();
    await expect(forgotPasswordPage.page).toHaveURL(/\/auth\/login/);
  });
});
