import { vi } from 'vitest';
import { act, getByText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import React from 'react';

const router = {
  pathname: '/',
  query: { page: '2' },
  push: vi.fn(),
};

vi.mock('next/navigation', async () => {
  const actual =
    await vi.importActual<typeof import('next/navigation')>('next/navigation');
  return {
    ...actual,
    useSearchParams: () => new URLSearchParams(),
  };
});

vi.mock('next/router', async () => {
  const actual = await vi.importActual<typeof import('next/router')>('next/router');
  return {
    ...actual,
    useRouter: () => router,
  };
});

const mockUseDispatch = vi.fn();
vi.mock('../../../app/store', () => {
  return {
    useAppDispatch: () => mockUseDispatch,
  };
});

describe('Pagination', () => {
  const user = userEvent.setup();

  beforeAll(vi.resetAllMocks);

  beforeEach(() => render(<Pagination />));
  test('Click on right button change search params in URL', async () => {
    await act(async () => {
      const right = await getByText(document.body, 'Right');
      await user.click(right);
    });
    expect(router.push).toHaveBeenCalledWith('/?page=3');
    expect(mockUseDispatch).toHaveBeenCalledWith({
      payload: 3,
      type: 'page/setFromQueryParams',
    });
  });
  test('Click on left button change search params in URL', async () => {
    await act(async () => {
      const right = await getByText(document.body, 'Left');
      await user.click(right);
    });
    expect(router.push).toHaveBeenCalledWith('/?page=1');
    expect(mockUseDispatch).toHaveBeenCalledWith({
      payload: 1,
      type: 'page/setFromQueryParams',
    });
  });
});
