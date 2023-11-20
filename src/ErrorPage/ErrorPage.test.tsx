import { getByTestId, render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe } from 'vitest';
import { vi } from 'vitest';
import Root from '../routes/Root';
import ErrorPage from './ErrorPage';

describe('Error page', () => {
  beforeAll(vi.resetAllMocks);
  const globConsole = console.log;
  console.log = vi.fn();
  afterAll(() => (console.log = globConsole));
  const routes = createMemoryRouter(
    [
      {
        path: '/',
        element: <Root />,
        loader: () => {
          return [];
        },
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/cards',
            element: <></>,
          },
        ],
      },
    ],
    { initialEntries: ['/unknown'] },
  );
  beforeEach(() => {
    render(<RouterProvider router={routes} />);
  });
  test('404 page is displayed when navigating to an invalid route', async () => {
    expect(getByTestId(document.body, 'ErrorPage')).toBeInTheDocument();
  });
});
