/**
 * `LoginPage` Page Object
 *
 * Design notes:
 * - Prefer ARIA-based locators (`getByRole`) for resilience.
 * - Keep selectors and UI knowledge here; keep assertions in specs.
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.createAccountLink = page.getByRole('link', { name: /create an account/i });
    // Multiple alerts can exist at once (inline validation + toast).
    // Keep dedicated toast locators for stable assertions.
    this.toast = page.getByRole('alert').filter({ hasText: /success|failed|error|invalid/i });

    // The visibility toggle renders as an icon next to the password input.
    // Using DOM proximity keeps this resilient without brittle CSS.
    // (On this app it's an `svg` sibling inside the password component.)
    this.passwordVisibilityIcon = this.passwordInput.locator('..').locator('svg').first();
  }

  /** Navigate directly to the login route. */
  async goto() {
    await this.page.goto('/auth/login');
  }

  /** @param {string} username */
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  /** @param {string} password */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Login using the UI.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.loginButton.click();
  }

  /** Toggle show/hide password control. */
  async togglePasswordVisibility() {
    await this.passwordVisibilityIcon.click();
  }
}

module.exports = { LoginPage };
