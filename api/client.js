import { config } from '../lib/constants';
import { getOptionalApiParameters } from '../utils/parameters';

export default class Client {
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
   * Formats query parameters into a URLSearchParams object
   *
   * @param {object|array} params
   * @returns {module:url.URLSearchParams}
   */
  formatQueryParameters(params) {
    let searchParams = new URLSearchParams();

    if (Array.isArray(params)) {
      params.forEach(([key, value]) => {
        searchParams.append(key, value);
      });
    } else {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          searchParams.append(key, params[key]);
        }
      }
    }

    return searchParams;
  }

  /**
   * Get a list of awards
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getAwards(params = { include: 'image' }) {
    return await this.request(`awards?${this.formatQueryParameters(params)}`);
  }

  /**
   * Get a list of forms
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getForms(params = {}) {
    return await this.request(`forms?${this.formatQueryParameters(params)}`);
  }

  /**
   * Get a list of groups
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getGroups(
    params = {
      include:
        'units,units.users,units.users.position,units.users.rank,units.users.rank.image,units.users.specialty,units.users.status'
    }
  ) {
    return await this.request(`groups?${this.formatQueryParameters(params)}`);
  }

  /**
   * Get the newsfeed
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getNewsfeed(params = {}) {
    return await this.request(`newsfeed${this.formatQueryParameters(params)}`);
  }

  /**
   * Get a list of qualifications
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getQualifications(params = { include: 'image' }) {
    return await this.request(`qualifications?${this.formatQueryParameters(params)}`);
  }

  /**
   * Get a list of ranks
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getRanks(params = { include: 'image' }) {
    return await this.request(`ranks?${this.formatQueryParameters(params)}`);
  }

  /**
   * Get a user
   *
   * @param id
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getUser(id, params = {}) {
    return await this.request(`users/${id}?${this.formatQueryParameters(params)}`);
  }
}
