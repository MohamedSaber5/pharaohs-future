/**
 * Escapes special characters in a string for use in a regular expression.
 * Prevents ReDoS (Regular Expression Denial of Service) attacks.
 *
 * @param {string} str - Raw input string
 * @returns {string} - Escaped string safe for RegExp
 */
export const escapeRegex = (str) => {
  if (typeof str !== "string") return "";
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export default escapeRegex;
