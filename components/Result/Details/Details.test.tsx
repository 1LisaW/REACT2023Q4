import { screen, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import mockedData from '../stubs/stub';

import Details from './Details';
import Spinner from '../../Spinner/Spinner';
import React from 'react';
import PropsI from '../../../pages/propsI';
import { MTGModel } from '../../../app/api/api';

type RenderedData = Omit<MTGModel, 'colors'>;

const props: PropsI = {
  cards: mockedData,
  details: { card: mockedData.cards[0] },
  name: '',
  page: '1',
  pageSize: '10',
  loadings: {
    loadingCards: false,
    loadingDetails: true,
  },
};

const router = {
  pathname: '/cards',
  query: { page: '2' },
  push: vi.fn(),
  back: vi.fn(),
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
vi.mock('next/navigation', async () => {
  const actual =
    await vi.importActual<typeof import('next/navigation')>('next/navigation');
  return {
    ...actual,
    useSearchParams: () => new URLSearchParams(),
  };
});

describe('Details', () => {
  beforeEach(vi.resetAllMocks);
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test(' loading indicator is displayed while fetching data', async () => {
    render(props.loadings.loadingDetails ? <Spinner /> : <Details data={props} />);

    await waitFor(async () => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  test('detailed card component correctly displays the detailed card data', async () => {
    props.loadings.loadingDetails = false;
    render(<Details data={props} />);

    await waitFor(async () => {
      await screen.getByTestId('details');
    });
    const renderedAttr: Array<keyof RenderedData> = [
      'name',
      'type',
      'set',
      'setName',
      'artist',
    ];
    expect(screen.getByTestId('details')).toBeInTheDocument();
    renderedAttr.forEach((attr) => {
      expect(screen.getByTestId(`details_${attr}`)).toHaveTextContent(
        props!.details!.card[attr],
      );
    });
  });

  test('clicking the close button hides the component', async () => {
    const user = userEvent.setup();
    render(props.loadings.loadingDetails ? <Spinner /> : <Details data={props} />);
    await waitFor(async () => {
      await screen.getByTestId('details');
      expect(screen.getByTestId('details')).toBeInTheDocument();
    });
    await user.click(screen.getByText('Close'));
    expect(router.back).toHaveBeenCalled();
  });
});
