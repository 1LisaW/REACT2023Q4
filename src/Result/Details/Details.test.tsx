import { vi } from 'vitest';
import {
  act,
  fireEvent,
  getAllByTestId,
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import mockedData from '../stubs/stub';
import Details, { loader } from './Details';
import { vi } from 'vitest';
import { DEFAULT_STATE, StateProvider } from '../../StateContext/SearchContext';
import { MTGModel } from '../../api/api';
import {
  BrowserRouter,
  MemoryRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createMemoryRouter,
} from 'react-router-dom';
import { routesAllTree } from '../../tests/testUtils';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { loader as detailsLoader } from './Details.tsx';

type RenderedData = Omit<MTGModel, 'colors'>;

describe('Details', () => {
  beforeEach(vi.resetAllMocks);

  test(' loading indicator is displayed while fetching data', async () => {
    const routes = createBrowserRouter(routesAllTree());
    render(
      <StateProvider defaultState={{ ...DEFAULT_STATE, result: mockedData.cards }}>
        <RouterProvider router={routes} />
      </StateProvider>,
    );
    await waitFor(async () => {
      const cardWrapper = screen.getByTestId('cards');
      const cards = getAllByTestId(cardWrapper, 'card');
      await fireEvent.click(cards[1]);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  test('fetching data', async () => {
    // const routes = createBrowserRouter([
    //   {
    //     path: '/cards/details/:id',
    //     element: <Outlet/>
    //   }
    // ]
    // );
    const mockedLoader = {
      loader: detailsLoader,
    };
    const spy = vi.spyOn(mockedLoader, 'loader').mockImplementation(() => {
      return { ...mockedData.cards[1] };
    });
    const routes = createMemoryRouter(
      [
        {
          path: '/',
          element: <Outlet></Outlet>,
          children: [
        {
          path: `/`,
          element: <Details />,
          loader: detailsLoader
        }]},
      ],
      { initialEntries: [`/`] },
    );
    render(<RouterProvider router={routes} />);
    //   <StateProvider defaultState={{...DEFAULT_STATE, result: mockedData.cards}}>
    //     <MemoryRouter >
    //       <Routes location={location}>
    //         <Route path="/cards/details/:id" element={<Outlet context={{card: mockedData.cards[1]}}/>}>
    //           <Route path="/cards/details/:id" index element={<Details/>} loader={()=>{return {card: mockedData.cards[1]}}} />
    //         </Route>
    //       </Routes>
    //   </MemoryRouter>
    //     {/* <RouterProvider router={routes}/> */}
    // </StateProvider> );
    // expect(spy).toHaveBeenCalled();

    // console.log(location.pathname);
    //  const cards = await screen.getAllByTestId('card');
    //  fireEvent.click(cards[1]);
    //  const spinner = screen.getAllByTestId("spinner")
    //  await waitForElementToBeRemoved(()=> spinner);
    const details = screen.getByTestId('details');
    //  expect(details).toBeInTheDocument();
    //  expect(screen.getByTestId(`details_${'name'}`)).toHaveTextContent(mockedData.cards[1].name+' ')
  });
});
