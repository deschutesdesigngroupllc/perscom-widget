import get from 'lodash/get';
import { jwtDecode } from 'jwt-decode';

export default class Auth {
  /**
   * @param {object} searchParams
   */
  constructor(searchParams) {
    this.searchParams = new URLSearchParams(searchParams);
  }

  /**
   * Get the current API key being used
   *
   * @returns {*|string}
   */
  getApiKey() {
    return this.getSearchParams().get('apikey') ?? process.env.API_KEY ?? null;
  }

  /**
   * Get the current PERSCOM ID being used
   *
   * @returns {*|string}
   */
  getPerscomId() {
    return this.getSearchParams().get('perscomid') ?? process.env.PERSCOM_ID ?? null;
  }

  /**
   * Get the current user ID via the API key
   *
   * @returns {string | undefined}
   */
  getAuthIdentifier(claim = 'sub') {
    return get(jwtDecode(String(this.getApiKey())), claim);
  }

  /**
   * Get the current query parameters
   *
   * @returns {module:url.URLSearchParams}
   */
  getSearchParams() {
    return this.searchParams;
  }
}
