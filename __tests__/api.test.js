/**
 * @jest-environment jsdom
 */
import { expect, jest, it, describe } from '@jest/globals';
import Auth from '../api/auth';
import ApiClient from '../api/client';
import jwt from 'jsonwebtoken';

const searchParams = {
  apikey: 'foo',
  perscomid: 'bar'
};
const auth = new Auth(searchParams);
const client = new ApiClient(auth);

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

describe('Client', () => {
  it('can format query parameters', () => {
    const searchParamsObject = client.formatQueryParameters({ include: 'test' });
    const searchParamsArray = client.formatQueryParameters([
      ['test1', 'test1'],
      ['test2', 'test2']
    ]);

    expect(searchParamsObject).toBeInstanceOf(URLSearchParams);
    expect(searchParamsObject.toString()).toStrictEqual('include=test');
    expect(searchParamsArray).toBeInstanceOf(URLSearchParams);
    expect(searchParamsArray.toString()).toStrictEqual('test1=test1&test2=test2');
  });
});
