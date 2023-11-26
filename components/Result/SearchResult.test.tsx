import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import {
  render,
  waitFor,
  getAllByTestId,
  getByTestId,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { store } from '../app/store.tsx';
import SearchResult from './SearchResult';
import mockedData from './stubs/stub.tsx';
import Root from '../routes/Root.tsx';

import { Provider } from 'react-redux';
import { cardMTGsApi } from '../app/services/api.tsx';
import { server } from '../mock/api/server.tsx';
import { HttpResponse, http } from 'msw';
import { MTG_API_URL } from '../api/api.tsx';

describe('Search result component', () => {
  const customCreateMemoryRouter = (name: string) => {
    const routes = [
      {
        path: '/',
        element: <Root />,
        loader: () =>
          store.dispatch(
            cardMTGsApi.endpoints.getMTGCards.initiate({
              name,
              page: '1',
              pageSize: '3',
            }),
          ),
        children: [
          {
            path: 'cards',
            element: <SearchResult />,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/cards'],
      initialIndex: 0,
    });
    return router;
  };

  test('Appropriate message is displayed if no cards are present', async () => {
    afterEach(() => server.resetHandlers());

    const router = customCreateMemoryRouter('sdfsdfsd');

    await store.dispatch(
      cardMTGsApi.endpoints.getMTGCards.initiate({
        name: 'sdfsdfsd',
        page: '1',
        pageSize: '10',
      }),
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    await waitFor(() => {
      const cards = getByTestId(document.body, 'cards');
      expect(cards).toHaveTextContent('No cards found');
    });
  });

  test('Card List renders the specified number of cards', async () => {
    beforeEach(() => {
      server.resetHandlers();
      server.close();
      server.listen();
    });
    afterEach(() => {
      server.resetHandlers();
    });
    server.use(
      http.get(`${MTG_API_URL}cards`, () => {
        return HttpResponse.json(mockedData, { status: 200 });
      }),
    );
    const router = customCreateMemoryRouter('');
    await act(() =>
      render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>,
      ),
    );

    await waitFor(() => {
      const cards = getByTestId(document.body, 'cards');
      expect(getAllByTestId(cards, 'card')).toHaveLength(mockedData.cards.length);
    });
  });
});
