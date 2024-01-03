/**
 * Pluralize a word
 *
 * @param {int} count
 * @param {string} noun
 * @param {string} suffix
 * @returns {`${string} ${string}${string}`}
 */
export const pluralize = (count, noun, suffix = 's') => {
  return `${count} ${noun}${count !== 1 ? suffix : ''}`;
};
