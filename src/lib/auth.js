import { getIronSession } from 'iron-session';
import { jwtDecode } from 'jwt-decode';
import get from 'lodash/get';
import { cookies } from 'next/headers';
import { decompressString } from './gzip';
import { sessionOptions } from './session';

export default class Auth {
  /**
   * Get the current API key being used
   *
   * @returns {*|string}
   */
  async getApiKey() {
    let { apiKey } = await getIronSession(cookies(), sessionOptions);

    if (apiKey) {
      apiKey = await decompressString(apiKey);
    }

    return apiKey ?? process.env.API_KEY ?? null;
  }

  /**
   * Get the current PERSCOM ID being used
   *
   * @returns {*|string}
   */
  async getPerscomId() {
    const { perscomId } = await getIronSession(cookies(), sessionOptions);

    return perscomId ?? process.env.PERSCOM_ID ?? null;
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
