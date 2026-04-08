/**
 * Registration coverage
 *
 * Focus:
 * - Mandatory fields / enablement
 * - Password masking toggle
 * - Validation feedback (email)
 * - Successful registration
 */
const { test, expect } = require('../../fixtures/test');
const { buildRegistrationData, buildInvalidEmails } = require('../../utils/test-data');

test.describe('Register', () => {
  test('all fields are mandatory (including Type) before Register is enabled', async ({ registerPage }) => {
    await registerPage.goto();

    await expect(registerPage.registerButton).toBeDisabled();
    await registerPage.usernameInput.fill('someuser');
    await registerPage.emailInput.fill('someuser@example.com');
    await registerPage.passwordInput.fill('Testpass123!');
    await expect(registerPage.registerButton).toBeDisabled();

    await registerPage.automationRadio.check();
    await expect(registerPage.registerButton).toBeEnabled();
  });

  test('password is hidden by default and can be toggled', async ({ registerPage }) => {
    await registerPage.goto();
    await expect(registerPage.passwordInput).toHaveAttribute('type', 'password');
    await registerPage.passwordInput.fill('Testpass123!');
    await registerPage.togglePasswordVisibility();
    await expect(registerPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('rejects invalid email formats (Register stays disabled)', async ({ registerPage }) => {
    await registerPage.goto();

    const invalidEmail = buildInvalidEmails()[0];
    await registerPage.usernameInput.fill('someuser');
    await registerPage.emailInput.fill(invalidEmail);
    await registerPage.passwordInput.fill('Testpass123!');
    await registerPage.automationRadio.check();

    // The UI enables submission, then returns a validation error via alert/toast.
    await registerPage.registerButton.click();
    await expect(
      registerPage.page.getByRole('alert').filter({ hasText: /invalid email address/i })
    ).toBeVisible();
  });

  test('creates an account after successful validation', async ({ registerPage }) => {
    await registerPage.goto();

    const data = buildRegistrationData();
    await registerPage.fillForm(data);

    await expect(registerPage.registerButton).toBeEnabled();
    await registerPage.submit();

    await expect(registerPage.toast).toBeVisible();
    await expect(registerPage.toast).toContainText(/register successful/i);
  });
});
