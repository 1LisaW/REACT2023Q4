import {
  act,
  fireEvent,
  getAllByTestId,
  screen,
  render,
  waitFor,
} from '@testing-library/react';
import mockedData from '../stubs/stub';
import Details from './Details';
import { vi } from 'vitest';
// import { DEFAULT_STATE, StateProvider } from '../../StateContext/SearchContext';
import { MTGModel } from '../../api/api';
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from 'react-router-dom';
import { routesAllTree } from '../../tests/testUtils';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { cardMTGsApi } from '../../app/services/api';
// import { cardMTGsApi } from '../../app/services/api';

type RenderedData = Omit<MTGModel, 'colors'>;

describe('Details', () => {
  beforeEach(vi.resetAllMocks);

  test(' loading indicator is displayed while fetching data', async () => {
    const routes = createBrowserRouter(routesAllTree());
    // store.dispatch(cardMTGsApi.endpoints.getMTGCards({name}))
    render(
      <Provider store={store}>
        {/* <StateProvider defaultState={{ ...DEFAULT_STATE, result: mockedData.cards }}> */}
        <RouterProvider router={routes} />
        {/* </StateProvider>, */}
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
    // vi.mock('react-router-dom', () => ({
    //   useParams: (): Readonly<Params<string>> => ({ id: mockedData.cards[1].id }),
    // }));
    // vi.mock('react-router-dom');
    // vi.mocked(useParams).mockReturnValue({ taskId: mockedData.cards[1].id });
    vi.mock('react-router-dom', async () => {
      const actual =
        await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
      return {
        ...actual,
        useParams: () => ({
          id: mockedData.cards[1].id,
        }),
        useOutletContext: () => ({
          id: mockedData.cards[1].id,
        }),
      };
    });
    const routes = createMemoryRouter(
      [
        {
          path: `/`,
          element: <Outlet context={{ id: mockedData.cards[1].id }} />,
          children: [
            {
              path: `/`,
              element: <Details />,
              loader: async () =>
                await store.dispatch(
                  cardMTGsApi.endpoints.getMTGCard.initiate({
                    id: mockedData.cards[1].id,
                  }),
                ),
            },
          ],
        },
      ],
      { initialEntries: [`/`] },
    );
    act(async () => {
      // await store.dispatch(cardMTGsApi.endpoints.getMTGCard.initiate({id:mockedData.cards[1].id}));
      console.log(location.pathname);
      render(
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>,
      );
    });

    const details = screen.getByTestId('details');
    const renderedAttr: Array<keyof RenderedData> = [
      'name',
      'manaCost',
      'cmc',
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
    const routes = createMemoryRouter(
      [
        {
          path: '/',
          element: <Outlet></Outlet>,
          children: [
            {
              path: `/details`,
              element: <Details />,
              loader: () => mockedData.cards[1],
            },
          ],
        },
      ],
      { initialEntries: [`/details`] },
    );
    await act(async () => {
      render(
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>,
      );
    });
    act(async () => {
      await store.dispatch(
        cardMTGsApi.endpoints.getMTGCard.initiate({ id: mockedData.cards[1].id }),
      );
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close'));
      expect(details).not.toBeInTheDocument();
    });
  });
});
