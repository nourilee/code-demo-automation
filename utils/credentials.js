/**
 * Known-good demo credentials.
 *
 * Why this file exists:
 * - Prevents hardcoding values inside specs.
 * - Makes it easy to rotate credentials without touching test logic.
 */

module.exports = {
  validUser: {
    username: 'user',
    password: 'wowTesting123!'
  },
  forgotPassword: {
    registeredEmail: 'user@email.com'
  }
};
