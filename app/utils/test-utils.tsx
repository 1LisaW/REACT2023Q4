import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import type { RootState } from '../store';
import { page } from '../slices/pageSlice';
import { loading } from '../slices/loadingSlice';
import { pageSize } from '../slices/pageSizeSlice';
import { cardMTGsApi } from '../services/api';

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      // searchText: searchText.reducer,
      page: page.reducer,
      pageSize: pageSize.reducer,
      loadings: loading.reducer,
      [cardMTGsApi.reducerPath]: cardMTGsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardMTGsApi.middleware),
    preloadedState,
  });
};
type AppStore = ReturnType<typeof setupStore>;
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
