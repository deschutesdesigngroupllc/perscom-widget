/**
 * @jest-environment jsdom
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import Auth from '../src/lib/auth';
import Client from '../src/lib/client';

const searchParams = {
  apikey: 'foo',
  perscomid: 'bar'
};
const auth = new Auth(searchParams);
const client = new Client(auth);

describe('Auth', () => {
  it('can get the API key', () => {
    expect(auth.getApiKey()).toBe('foo');
  });

  it('can get the PERSCOM id', () => {
    expect(auth.getPerscomId()).toBe('bar');
  });

  it('can get the search parameters', () => {
    expect(auth.getSearchParams()).toBeInstanceOf(URLSearchParams);
    expect(auth.getSearchParams()).toStrictEqual(new URLSearchParams(searchParams));
  });

  it('can decode a JWT token', () => {
    const token = jwt.sign({ sub: 12345 }, 'password');
    const testAuth = new Auth({
      apikey: token,
      perscomid: 1
    });

    expect(testAuth.getAuthIdentifier()).toStrictEqual(12345);
  });
});

describe('Successful Client Requests', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              foo: 'bar'
            }
          })
      })
    );
  });

  it('can make an awards request', async () => {
    const results = await client.getAwards();

    expect(results).toStrictEqual({
      data: {
        foo: 'bar'
      }
    });
  });

  it('can make a forms request', async () => {
    const results = await client.getForms();

    expect(results).toStrictEqual({
      data: {
        foo: 'bar'
      }
    });
  });

  it('can make a groups request', async () => {
    const results = await client.getGroups();

    expect(results).toStrictEqual({
      data: {
        foo: 'bar'
      }
    });
  });

  it('can make a newsfeed request', async () => {
    const results = await client.getNewsfeed();

    expect(results).toStrictEqual({
      data: {
        foo: 'bar'
      }
    });
  });

  it('can make a qualifications request', async () => {
    const results = await client.getQualifications();

    expect(results).toStrictEqual({
      data: {
        foo: 'bar'
      }
    });
  });

  it('can make a ranks request', async () => {
    const results = await client.getRanks();

    expect(results).toStrictEqual({
      data: {
        foo: 'bar'
      }
    });
  });

  it('can make a user request', async () => {
    const results = await client.getUser(1);

    expect(results).toStrictEqual({
      data: {
        foo: 'bar'
      }
    });
  });
});

describe('Failed Client Requests', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        json: () =>
          Promise.resolve({
            error: {
              message: 'foo bar'
            }
          })
      })
    );
  });

  it('will throw an error on a bad request response ', async () => {
    try {
      const results = await client.getAwards();

      expect(results).toThrowError(Error);
    } catch (e) {
      expect(e.message).toBe('foo bar');
    }
  });
});
