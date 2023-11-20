import {
  act,
  fireEvent,
  getAllByTestId,
  screen,
  render,
  waitFor,
} from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import {
  MemoryRouter,
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from 'react-router-dom';

import mockedData from '../stubs/stub';
import { MTGModel } from '../../api/api';
import { store } from '../../app/store';

import { routesAllTree } from '../../tests/testUtils';
import { server } from '../../mock/api/server';
import SearchResult from '../SearchResult';
import Root, { loader as cardsLoader } from '../../routes/Root';
import Details, { loader as detailsLoader } from './Details';
import { cardMTGsApi } from '../../app/services/api';

type RenderedData = Omit<MTGModel, 'colors'>;

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      id: mockedData.cards[1].id,
    }),
  };
});

describe('Details', () => {
  beforeEach(vi.resetAllMocks);
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  afterEach(() => server.resetHandlers());

  test(' loading indicator is displayed while fetching data', async () => {
    const routes = createBrowserRouter(routesAllTree());
    render(
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>,
    );
    act(() => {
      store.dispatch(
        cardMTGsApi.endpoints.getMTGCards.initiate({
          page: '1',
          name: '',
          pageSize: '3',
        }),
      );
    });
    await waitFor(async () => {
      const cardWrapper = screen.getByTestId('cards');
      const cards = getAllByTestId(cardWrapper, 'card');
      await fireEvent.click(cards[1]);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  test('detailed card component correctly displays the detailed card data', async () => {
    await store.dispatch(
      cardMTGsApi.endpoints.getMTGCard.initiate({ id: mockedData.cards[1].id }),
    );
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>,
    );

    const details = await screen.getByTestId('details');
    const renderedAttr: Array<keyof RenderedData> = [
      'name',
      'type',
      'set',
      'setName',
      'artist',
    ];
    expect(details).toBeInTheDocument();
    renderedAttr.forEach((attr) => {
      expect(screen.getByTestId(`details_${attr}`)).toHaveTextContent(
        mockedData.cards[1][attr],
      );
    });
  });

  test('clicking the close button hides the component', async () => {
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
        initialIndex: 2,
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
    let details;
    await waitFor(async () => {
      await screen.getAllByTestId('card');
      details = await screen.getByTestId('details');
      expect(details).toBeInTheDocument();
    });
    const cards = await screen.getAllByTestId('card');
    await user.click(cards[1]);
    expect(details).not.toBeInTheDocument();
  });
});
