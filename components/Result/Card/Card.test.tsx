import { vi } from 'vitest';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockedData from '../stubs/stub.tsx';

import Card from './Card';
import { MTGModel } from '../../../app/api/api.tsx';
import React from 'react';

type RenderedData = Omit<MTGModel, 'colors'>;

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

const mockUseDispatch = vi.fn();
vi.mock('../../../app/store', () => {
  return {
    useAppDispatch: () => mockUseDispatch,
  };
});

describe('Card component', () => {
  beforeEach(vi.resetAllMocks);
  const mockedCard = mockedData.cards[0];

  test('Card renders the relevant card data', () => {
    const renderedAttr: Array<keyof RenderedData> = ['name', 'manaCost', 'type'];
    render(<Card {...mockedCard} />);
    renderedAttr.forEach((attr) => {
      expect(getByTestId(document.body, attr)).toHaveTextContent(mockedCard[attr]);
    });
  });

  test('Clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();

    render(<Card {...mockedCard} />);
    await waitFor(async () => {
      await screen.getAllByTestId('card');
    });
    const card = await screen.getByTestId('card');
    await user.click(card);
    expect(router.push).toHaveBeenCalledWith({
      pathname: `/cards/detail/${mockedCard.id}`,
      query: router.query,
    });
  });

  test('FETCH details data', async () => {
    render(<Card {...mockedCard} />);
    const user = userEvent.setup();

    await waitFor(async () => {
      // const cardWrapper = await getByTestId(document.body, 'cards');
      const card = await screen.getByTestId('card');
      await user.click(card);
      expect(router.push).toHaveBeenCalledWith({
        pathname: `/cards/detail/${mockedCard.id}`,
        query: router.query,
      });
    });
  });
});
