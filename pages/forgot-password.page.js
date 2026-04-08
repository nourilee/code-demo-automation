/**
 * `ForgotPasswordPage` Page Object
 *
 * Scope:
 * - Validates the user-visible forgot-password experience (form + toast feedback).
 * - Does not attempt mailbox/email-link validation because the target app UI
 *   does not expose a reset link for browser-based automation.
 */
class ForgotPasswordPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.submitButton = page.getByRole('button', { name: 'Forgot Password' });
    this.backToLoginLink = page.getByRole('link', { name: /back to login/i });
    this.alert = page.getByRole('alert');
  }

  /** Navigate directly to the forgot-password route. */
  async goto() {
    await this.page.goto('/auth/forgot');
  }

  /**
   * Request a password reset.
   * @param {string} email
   */
  async requestReset(email) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}

module.exports = { ForgotPasswordPage };
