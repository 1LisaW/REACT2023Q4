import {
  fireEvent,
  getByPlaceholderText,
  getByText,
  render,
} from '@testing-library/react';
import { vi } from 'vitest';
import { describe } from 'vitest';
import Search from './Search';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getStorageData, setStorageData } from '../store/storage';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('Search component', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Search />,
    },
  ]);
  beforeAll(vi.resetAllMocks);

  beforeEach(() => {
    setStorageData('default search');
    return render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
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
    fireEvent.click(getByText(document.body, 'Search'));
    expect(getStorageData()).toBe('oo');
  });
});
