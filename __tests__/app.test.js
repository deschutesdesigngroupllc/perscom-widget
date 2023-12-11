/**
 * @jest-environment jsdom
 */
import { expect, it, describe, beforeEach, jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../app/roster/page';

const searchParams = {
  apikey: 'foo',
  perscomid: 'bar'
};

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
    render(await Page(searchParams));

    expect(screen.getByTestId('unit foobar')).toBeInTheDocument();
    expect(screen.getByTestId('user foobar')).toBeInTheDocument();
  });
});
