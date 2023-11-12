import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { act, getByText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  const user = userEvent.setup();

  beforeAll(vi.resetAllMocks);

  beforeEach(() =>
    render(
      <BrowserRouter>
        <Routes location={location}>
          <Route path="/" element={<Outlet context={{ page: 1, onClick: () => {} }} />}>
            <Route index element={<Pagination />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    ),
  );
  test('Click on right button change search params in URL', async () => {
    await act(async () => {
      const right = await getByText(document.body, 'Right');
      await user.click(right);
    });
    expect(location.search).toBe('?page=2');
  });
});
