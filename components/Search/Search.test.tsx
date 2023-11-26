import {
  fireEvent,
  getByPlaceholderText,
  getByText,
  render,
} from '@testing-library/react';
import { vi } from 'vitest';
import { describe } from 'vitest';
import Search from './Search';
import { getStorageData, setStorageData } from '../../app/services/storage';
import React from 'react';

const mockUseDispatch = vi.fn();
vi.mock('../../app/store', () => {
  return {
    useAppDispatch: () => mockUseDispatch,
  };
});

describe('Search component', () => {
  beforeAll(vi.resetAllMocks);

  beforeEach(() => {
    setStorageData('default search');
    return render(<Search name={'default search'} />);
  });

  vi.mock('../../app/slices/pageSizeSlice', async () => {
    return {
      usePageSizeSelector: () => '3',
    };
  });
  vi.mock('next/navigation', async () => {
    const actual =
      await vi.importActual<typeof import('next/navigation')>('next/navigation');
    return {
      ...actual,
      useSearchParams: () => new URLSearchParams(),
    };
  });

  test('component retrieves the value from the local storage upon mounting', async () => {
    expect(
      await getByPlaceholderText(document.body, 'Search').getAttribute('value'),
    ).toBe(getStorageData() || '');
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    fireEvent.change(getByPlaceholderText(document.body, 'Search'), {
      target: { value: 'oo' },
    });
    fireEvent.submit(getByText(document.body, 'Search'));
    expect(getStorageData()).toBe('oo');
  });
});
