/**
 * `RegisterPage` Page Object
 *
 * Design notes:
 * - Encapsulates registration form interactions only.
 * - Keeps required domain knowledge (like the mandatory Type radio) out of specs.
 */
class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: /^login$/i });
    this.toast = page.getByRole('alert').filter({ hasText: /success|failed|error|invalid/i });

    this.manualRadio = page.getByRole('radio', { name: 'Manual' });
    this.automationRadio = page.getByRole('radio', { name: 'Automation' });

    // PrimeVue password component renders an `svg` toggle next to the input.
    this.passwordVisibilityIcon = this.passwordInput.locator('..').locator('svg').first();
  }

  /** Navigate directly to the registration route. */
  async goto() {
    await this.page.goto('/auth/register');
  }

  /**
   * Fill the registration form.
   * @param {{ username: string, email: string, password: string, type?: 'Manual'|'Automation'|string }} data
   */
  async fillForm({ username, email, password, type }) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    // Registration requires selecting a "Type".
    if (type?.toLowerCase() === 'manual') {
      await this.manualRadio.check();
    } else {
      await this.automationRadio.check();
    }
  }

  /** Click the Register button. */
  async submit() {
    await this.registerButton.click();
  }

  /** Toggle show/hide password control. */
  async togglePasswordVisibility() {
    await this.passwordVisibilityIcon.click();
  }
}

module.exports = { RegisterPage };
