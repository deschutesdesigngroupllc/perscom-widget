import { getIronSession } from 'iron-session';
import { jwtDecode } from 'jwt-decode';
import get from 'lodash/get';
import { cookies } from 'next/headers';
import { sessionOptions } from './session';

export default class Auth {
  /**
   * Get the current API key being used
   *
   * @returns {*|string}
   */
  async getApiKey() {
    const session = await getIronSession(cookies(), sessionOptions);

    return session.apiKey ?? process.env.API_KEY ?? null;
  }

  /**
   * Get the current PERSCOM ID being used
   *
   * @returns {*|string}
   */
  async getPerscomId() {
    const session = await getIronSession(cookies(), sessionOptions);

    return session.perscomId ?? process.env.PERSCOM_ID ?? null;
  }

  /**
   * Get the current user ID via the API key
   *
   * @returns {string | undefined}
   */
  async getAuthIdentifier(claim = 'sub') {
    return await get(jwtDecode(String(this.getApiKey())), claim);
  }
}
