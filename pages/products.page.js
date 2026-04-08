/**
 * `ProductsPage` Page Object
 *
 * Used as a stable post-login landing page assertion.
 */
class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('paragraph', { name: 'Products' });
    this.searchInput = page.getByRole('textbox', { name: 'Search Product' });
  }

  /**
   * Assertion helper used by specs.
   *
   * Why `Search Product`:
   * - "Products" appears multiple times (breadcrumb + title), so a strict-mode text locator
   *   is ambiguous.
   * - The search box is unique and reliably indicates the page is ready.
   *
   * @param {import('@playwright/test').Expect} expect
   */
  async assertOnPage(expect) {
    await expect(this.page).toHaveURL(/\/practice\/shop\/products/);
    await expect(this.searchInput).toBeVisible();
  }
}

module.exports = { ProductsPage };
