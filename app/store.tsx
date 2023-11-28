import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cardMTGsApi } from './services/api';
import { page } from './slices/pageSlice';
import { pageSize } from './slices/pageSizeSlice';
import { searchText } from './slices/searchTextSlice';
import { loading } from './slices/loadingSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      searchText: searchText.reducer,
      page: page.reducer,
      pageSize: pageSize.reducer,
      loadings: loading.reducer,
      [cardMTGsApi.reducerPath]: cardMTGsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardMTGsApi.middleware),
  });

// export const store = createStore();
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<AppStore['getState']>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppStore = ReturnType<typeof createStore>;
export const wrapper = createWrapper<AppStore>(createStore);
