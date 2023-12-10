import { config } from '../lib/constants';
import { getOptionalApiParameters } from '../utils/parameters';

export default class ApiClient {
  /**
   * @param {Auth} auth
   */
  constructor(auth) {
    this.auth = auth;
  }

  /**
   * Create an API request
   *
   * @param endpoint
   * @param method
   * @param body
   * @returns {Promise<any>}
   */
  async request(endpoint, method = 'GET', body = null) {
    let init = {
      method: method,
      headers: {
        'X-Perscom-Id': this.auth.getPerscomId(),
        'X-Perscom-Widget': true,
        Authorization: `Bearer ${this.auth.getApiKey()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      init.body = JSON.stringify(body);
    }

    const url = new URL(config.app.API_URL + endpoint);
    getOptionalApiParameters().forEach((parameter) => {
      if (this.auth.getSearchParams().has(parameter)) {
        url.searchParams.set(parameter, this.auth.getSearchParams().get(parameter));
      }
    });

    const response = await fetch(url.href, init);
    const json = await response.json();

    if (response.status !== 200) {
      throw new Error(
        `${response.status}: ${
          json.error.message ?? 'There was an error with the last request. Please try again.'
        }`
      );
    }

    return json;
  }

  /**
   * Get a list of awards
   *
   * @returns {Promise<*>}
   */
  async getAwards() {
    return await this.request('awards?include=image');
  }

  /**
   * Get a list of forms
   *
   * @returns {Promise<*>}
   */
  async getForms() {
    return await this.request('forms');
  }

  /**
   * Get a list of groups
   *
   * @returns {Promise<*>}
   */
  async getGroups() {
    return await this.request(
      'groups?include=units,units.users,units.users.position,units.users.rank,units.users.rank.image,units.users.specialty,units.users.status'
    );
  }

  /**
   * Get the newsfeed
   *
   * @returns {Promise<*>}
   */
  async getNewsfeed() {
    return await this.request('newsfeed');
  }

  /**
   * Get a list of qualifications
   *
   * @returns {Promise<*>}
   */
  async getQualifications() {
    return await this.request('qualifications?include=image');
  }

  /**
   * Get a list of ranks
   *
   * @returns {Promise<*>}
   */
  async getRanks() {
    return await this.request('ranks?include=image');
  }
}
