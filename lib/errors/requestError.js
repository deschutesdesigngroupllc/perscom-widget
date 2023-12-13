export class RequestError extends Error {
  /**
   * @param {int} status
   * @param {object} response
   * @param {string} message
   */
  constructor({ status, response, message }) {
    super(message);
    this.status = status;
    this.response = response;
  }
}
