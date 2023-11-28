import { render, waitFor, getAllByTestId, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResult from './SearchResult';
import mockedData from './stubs/stub.tsx';
import Propsi from '../../pages/propsI.tsx';

import React from 'react';
import { vi } from 'vitest';

const props: Propsi = {
  cards: mockedData,
  name: '',
  page: '1',
  pageSize: '10',
  loadings: {
    loadingCards: false,
    loadingDetails: false,
  },
};

const router = {
  pathname: '/cards',
  query: { page: '2' },
  push: vi.fn(),
};

vi.mock('next/router', async () => {
  const actual = await vi.importActual<typeof import('next/router')>('next/router');
  return {
    ...actual,
    useRouter: () => router,
  };
});

vi.mock('../../app/slices/loadingSlice', async () => {
  return {
    useLoadingSelector: () => props.loadings,
  };
});

vi.mock('../../../app/slices/loadingSlice', async () => {
  return {
    toggleLoadingDetails: vi.fn(),
  };
});

const mockUseDispatch = vi.fn();
vi.mock('../../app/store', () => {
  return {
    useAppDispatch: () => mockUseDispatch,
  };
});

describe('Search result component', () => {
  it('should be', async () => {
    render(<SearchResult data={props} />),
      await waitFor(() => {
        const cards = getByTestId(document.body, 'cards');
        expect(getAllByTestId(cards, 'card')).toHaveLength(mockedData.cards.length);
      });
  });
});
