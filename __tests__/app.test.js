/**
 * @jest-environment jsdom
 */
import { expect, it, describe, beforeEach, beforeAll, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Layout from '../src/app/layout';
import Newsfeed from '../src/app/newsfeed/page';
import Roster from '../src/app/roster/page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => jest.fn()
    };
  },
  usePathname() {
    return 'test.com';
  }
}));

const searchParams = {
  apikey: 'foo',
  perscomid: 'bar'
};

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });
});

describe('Roster', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: [
              {
                id: 1,
                name: 'group foobar',
                units: [
                  {
                    id: 1,
                    name: 'unit foobar',
                    users: [
                      {
                        id: 1,
                        name: 'user foobar'
                      }
                    ]
                  }
                ]
              }
            ]
          })
      })
    );
  });

  it('can render', async () => {
    const { container } = render(
      Layout({
        children: await Roster(searchParams)
      })
    );

    expect(screen.getByTestId('unit foobar')).toBeInTheDocument();
    expect(screen.getByTestId('user foobar')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

describe('Newsfeed', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: [
              {
                id: 1,
                headline: 'newsfeed foobar'
              }
            ]
          })
      })
    );
  });

  it('can render', async () => {
    const { container } = render(
      Layout({
        children: await Newsfeed(searchParams)
      })
    );

    expect(screen.getByTestId('newsfeed foobar')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
