import { configureStore } from '@reduxjs/toolkit';
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

export const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
