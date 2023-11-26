import '@testing-library/jest-dom';
import { server } from './mocks/api/server';
import { apiSlice } from './app/api/apiSlice';
import { setupStore } from './app/store';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});

afterAll(() => server.close());
