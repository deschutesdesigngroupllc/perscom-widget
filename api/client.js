import { RequestError } from '../lib/errors/requestError';
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
   * @param {string} endpoint
   * @param {string} method
   * @param {object|null} body
   * @param {object|null} params
   * @returns {Promise<any>}
   */
  async request(endpoint, method = 'GET', body = null, params = null) {
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

    if (params) {
      const additionalParams = new URLSearchParams(params);
      additionalParams.forEach((value, key) => url.searchParams.set(key, value));
    }

    getOptionalApiParameters().forEach((parameter) => {
      if (this.auth.getSearchParams().has(parameter)) {
        url.searchParams.set(parameter, this.auth.getSearchParams().get(parameter));
      }
    });

    const response = await fetch(url.href, init);
    const json = await response.json();

    if (response.status < 200 || response.status >= 300) {
      throw new RequestError({
        status: response.status,
        response: json,
        message:
          json.error?.message ?? 'There was an error with the last request. Please try again.'
      });
    }

    return json;
  }

  /**
   * Get a list of awards
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getAwards(params = { include: 'image' }) {
    return await this.request('awards', 'GET', null, params);
  }

  /**
   * Get a list of events
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getEvents(params = { include: 'calendar', limit: '100' }) {
    return await this.request('events', 'GET', null, params);
  }

  /**
   * Get a list of forms
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getForms(params = {}) {
    return await this.request('forms', 'GET', null, params);
  }

  /**
   * Get a form
   *
   * @param id
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getForm(id, params = { include: 'fields', limit: 100 }) {
    return await this.request(`forms/${id}`, 'GET', null, params);
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
        'units,units.users,units.users.position,units.users.rank,units.users.rank.image,units.users.specialty,units.users.status',
      limit: 100
    }
  ) {
    return await this.request('groups', 'GET', null, params);
  }

  /**
   * Get the newsfeed
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getNewsfeed(params = {}) {
    return await this.request('newsfeed', 'GET', null, params);
  }

  /**
   * Get a list of qualifications
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getQualifications(params = { include: 'image' }) {
    return await this.request('qualifications', 'GET', null, params);
  }

  /**
   * Get a list of ranks
   *
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getRanks(params = { include: 'image' }) {
    return await this.request('ranks', 'GET', null, params);
  }

  /**
   * Get a user
   *
   * @param id
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async getUser(id, params = {}) {
    return await this.request(`users/${id}`, 'GET', null, params);
  }

  /**
   * Create a submission
   *
   * @param id
   * @param {object|null} body
   * @param {object|array} params
   * @returns {Promise<*>}
   */
  async postSubmission(id, body = null, params = {}) {
    return await this.request(`forms/${id}/submissions`, 'POST', body, params);
  }
}
