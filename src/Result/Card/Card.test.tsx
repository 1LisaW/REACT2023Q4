import { vi } from 'vitest';
import { getAllByTestId, getByTestId, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockedData from '../stubs/stub.tsx';
import Card from './Card';
import { MTGModel } from '../../api/api.tsx';
import SearchResult from '../SearchResult.tsx';
import Root from '../../routes/Root.tsx';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
// import { MemoryHistory, createMemoryHistory } from 'history'
import Details, { loader as detailsLoader } from '../Details/Details.tsx';
import { DEFAULT_STATE, StateProvider } from '../../StateContext/SearchContext.tsx';

type RenderedData = Omit<MTGModel, 'colors'>;

describe('Card component', () => {
  test('Card renders the relevant card data', () => {
    const renderedAttr: Array<keyof RenderedData> = ['name', 'manaCost', 'type'];
    const mockedCard = mockedData.cards[0];
    render(<Card {...mockedCard} />);
    renderedAttr.forEach((attr) => {
      expect(getByTestId(document.body, attr)).toHaveTextContent(mockedCard[attr]);
    });
  });

  const mockDetails = () => {
    return { card: mockedData.cards[1] };
  };

  const customCreateMemoryRouter = (
    mockedData: Record<'cards', MTGModel[] | never[]>,
  ) => {
    const routes = [
      {
        path: '/',
        element: <Root />,
        loader: () => {
          return mockedData;
        },
        children: [
          {
            path: 'cards',
            element: <SearchResult />,
            children: [
              {
                path: 'details/:id',
                loader: mockDetails,
                element: <Details />,
              },
            ],
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/cards'],
      initialIndex: 1,
    });
    return router;
  };

  test('Clicking on a card opens a detailed card component', async () => {
    const router = customCreateMemoryRouter(mockedData);
    render(
      <StateProvider defaultState={{ ...DEFAULT_STATE, result: mockedData.cards }}>
        <RouterProvider router={router} />
      </StateProvider>,
    );
    const user = userEvent.setup();
    await waitFor(async () => {
      const cards = await getAllByTestId(document.body, 'card');
      await user.click(cards[1]);
      expect(await getByTestId(document.body, 'details')).toBeInTheDocument();
    });
  });

  test('FETCH details data', async () => {
    const mockedLoader = {
      loader: detailsLoader,
    };
    const spy = vi.spyOn(mockedLoader, 'loader').mockImplementation(() => {
      return { ...mockedData.cards[1] };
    });
    const routes = [
      {
        path: '/',
        element: <Root />,
        loader: () => {
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

    render(
      <StateProvider defaultState={{ ...DEFAULT_STATE, result: mockedData.cards }}>
        <RouterProvider router={router} />
      </StateProvider>,
    );
    const user = userEvent.setup();
    await waitFor(async () => {
      const cardWrapper = await getByTestId(document.body, 'cards');
      const cards = await getAllByTestId(cardWrapper, 'card');
      await user.click(cards[1]);
      await getByTestId(document.body, 'details');
    });
    expect(spy).toHaveBeenCalled();
  });
});
