import { vi } from 'vitest';
import {
  getAllByTestId,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom';
import mockedData from '../stubs/stub.tsx';
import { MTGModel } from '../../api/api.tsx';

import { server } from '../../mock/api/server.tsx';
import { store } from '../../app/store.tsx';
import SearchResult from '../SearchResult.tsx';
import Root, { loader as cardsLoader } from '../../routes/Root.tsx';
import Details, { loader as detailsLoader } from '../Details/Details.tsx';
import Card from './Card';
import { cardMTGsApi } from '../../app/services/api.tsx';
import { toggleLoadingDetails } from '../../app/slices/loadingSlice.tsx';

type RenderedData = Omit<MTGModel, 'colors'>;

describe('Card component', () => {
  beforeEach(vi.resetAllMocks);

  afterEach(() => server.resetHandlers());

  test('Card renders the relevant card data', () => {
    const renderedAttr: Array<keyof RenderedData> = ['name', 'manaCost', 'type'];
    const mockedCard = mockedData.cards[0];
    render(<Card {...mockedCard} />);
    renderedAttr.forEach((attr) => {
      expect(getByTestId(document.body, attr)).toHaveTextContent(mockedCard[attr]);
    });
  });

  test('Clicking on a card opens a detailed card component', async () => {
    const customCreateMemoryRouter = () => {
      const routes = [
        {
          path: '/',
          element: <Root />,
          loader: cardsLoader,
          children: [
            {
              path: 'cards',
              element: <SearchResult />,
              children: [
                {
                  path: 'details/:id',
                  loader: detailsLoader,
                  element: <Details />,
                },
              ],
            },
          ],
        },
      ];

      const router = createMemoryRouter(routes, {
        initialEntries: ['/', '/cards', '/cards/details/:id'],
        initialIndex: 1,
      });
      return router;
    };
    const router = customCreateMemoryRouter();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    await waitFor(async () => {
      await screen.getAllByTestId('card');
    });
    const cards = await screen.getAllByTestId('card');
    await user.click(cards[1]);
    await waitFor(async () => {
      await screen.getAllByTestId('details');
    });
    expect(getByTestId(document.body, 'details')).toBeInTheDocument();
  });

  test('FETCH details data', async () => {
    const mockedLoader = {
      loader: detailsLoader,
    };
    const spy = vi.spyOn(mockedLoader, 'loader').mockImplementation(() => {
      return { ...mockedData.cards[1] };
    });
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <Root />,
        loader: async () => {
          await store.dispatch(
            cardMTGsApi.endpoints.getMTGCards.initiate({
              name: '',
              page: '1',
              pageSize: '3',
            }),
          );
          return mockedData;
        },
        children: [
          {
            path: 'cards',
            element: <SearchResult />,
            children: [
              {
                path: 'details/:id',
                element: <Details />,
                loader: mockedLoader.loader,
              },
            ],
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/cards`],
      initialIndex: 0,
    });
    await store.dispatch(
      cardMTGsApi.endpoints.getMTGCards.initiate({ name: '', page: '1', pageSize: '10' }),
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    const user = userEvent.setup();

    await waitFor(async () => {
      const cardWrapper = await getByTestId(document.body, 'cards');
      const cards = await getAllByTestId(cardWrapper, 'card');
      await user.click(cards[1]);
      await store.dispatch(toggleLoadingDetails(false));

      await getByTestId(document.body, 'details');
    });
    expect(spy).toHaveBeenCalled();
  });
});
