const { faker } = require('@faker-js/faker');

// Centralized test data generation to keep test files clean.
// (This also makes it easy to expand into true data-driven tests later.)

/**
 * Build a valid registration payload.
 *
 * Why stable-ish values:
 * - Demo apps often have undocumented password/username constraints.
 * - Using a consistent password + constrained username reduces flaky failures
 *   while still keeping registrations unique.
 *
 * @param {Partial<{ username: string, email: string, password: string, type: 'Automation'|'Manual'|string }>} overrides
 * @returns {{ username: string, email: string, password: string, type: string }}
 */
function buildRegistrationData(overrides = {}) {
  // Some demo apps enforce strict username rules (min length, no special chars).
  // Keep this conservative and deterministic to avoid random failures.
  const uniqueSuffix = faker.string.alphanumeric({ length: 6, casing: 'lower' });
  const username = `qa_${uniqueSuffix}`;
  const email = `qa.${uniqueSuffix}@example.com`;

  return {
    username,
    email,
    // Keep password stable to reduce flakiness from unknown password rules.
    password: 'Testpass123!',
    type: 'Automation',
    ...overrides
  };
}

/**
 * Data set used for email-format validation scenarios.
 * @returns {string[]}
 */
function buildInvalidEmails() {
  return ['plainaddress', 'missing-at.com', 'missing-domain@', 'name@domain', 'name@domain..com'];
}

module.exports = {
  buildRegistrationData,
  buildInvalidEmails
};
