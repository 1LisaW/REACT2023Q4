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
import { DEFAULT_STATE, StateProvider } from '../../StateContext/SearchContext';
import { MTGModel } from '../../api/api';
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from 'react-router-dom';
import { routesAllTree } from '../../tests/testUtils';

type RenderedData = Omit<MTGModel, 'colors'>;

describe('Details', () => {
  beforeEach(vi.resetAllMocks);

  test(' loading indicator is displayed while fetching data', async () => {
    const routes = createBrowserRouter(routesAllTree());
    render(
      <StateProvider defaultState={{ ...DEFAULT_STATE, result: mockedData.cards }}>
        <RouterProvider router={routes} />
      </StateProvider>,
    );
    await waitFor(async () => {
      const cardWrapper = screen.getByTestId('cards');
      const cards = getAllByTestId(cardWrapper, 'card');
      await fireEvent.click(cards[1]);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  test('detailed card component correctly displays the detailed card data', async () => {
    const routes = createMemoryRouter(
      [
        {
          path: `/`,
          element: <Details />,
          loader: () => mockedData.cards[1],
        },
      ],
      { initialEntries: [`/`] },
    );
    await act(async () => {
      render(<RouterProvider router={routes} />);
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
      render(<RouterProvider router={routes} />);
    });

    const details = screen.getByTestId('details');
    expect(details).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(details).not.toBeInTheDocument();
  });
});
