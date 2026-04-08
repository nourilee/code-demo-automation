# CodeDemo QA Automation (Playwright)

Professional-grade QA automation portfolio project using:

- Playwright Test
- JavaScript (CommonJS)
- Page Object Model (POM)
- Data generation via Faker

Target app: https://codemo.dev/auth/login

## Run

```bash
npm install
npx playwright install chromium
npx playwright test
```

## CI (GitHub Actions)

- Workflow: [.github/workflows/playwright.yml](.github/workflows/playwright.yml)
- On each run, the HTML report is uploaded as an artifact named `playwright-report`.

## Report (GitHub Pages)

- On pushes to `main`, the workflow also publishes the latest Playwright HTML report to GitHub Pages.
- URL format: `https://<your-github-username>.github.io/<your-repo-name>/`

## Structure

- pages/ — Page Objects (encapsulated actions + locators)
- fixtures/ — Test fixtures wiring Page Objects into tests
- utils/ — Data factories + shared test data
- tests/ — Specs (Arrange / Act / Assert)

## Configuration

- Playwright config: [playwright.config.js](playwright.config.js)

## Test Case Coverage

### Login ([tests/auth/login.spec.js](tests/auth/login.spec.js))

- Password is hidden by default and can be shown/hidden via the eye icon
- "Create an account" link navigates to the registration screen
- "Forgot Password ?" link navigates to the forgot-password screen
- Valid login navigates to the dashboard (products)
- Invalid password shows an error toast

### Register ([tests/auth/register.spec.js](tests/auth/register.spec.js))

- Register button stays disabled until mandatory inputs are satisfied (including the required "Type" radio)
- Password is hidden by default and can be shown/hidden via the eye icon
- Invalid email format shows an "Invalid email address" error
- Valid registration shows a "Register successful" toast

### Forgot Password ([tests/auth/forgot-password.spec.js](tests/auth/forgot-password.spec.js))

- Submit button stays disabled until an email is entered
- Submitting a registered email shows a success toast
- "Back to Login" navigates back to the login screen

## Coverage Constraints

- The app’s forgot-password flow confirms submission via a success toast, but does not expose a reset link/reset-password page in the UI, so reset-link navigation and password reset cannot be validated end-to-end from the browser.
- The login screen uses "Username" (not email).
