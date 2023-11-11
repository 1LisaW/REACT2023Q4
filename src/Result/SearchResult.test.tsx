import {
	RouterProvider,
	createMemoryRouter,
  } from "react-router-dom";
  import {
	render,
	waitFor,
	getAllByTestId,
	getByTestId,
  } from "@testing-library/react";
  import "@testing-library/jest-dom";
import SearchResult from "./SearchResult";
import mockedData from './stubs/stub.tsx';
import Root from "../routes/Root.tsx";
import { DEFAULT_STATE, StateProvider } from "../StateContext/SearchContext.tsx";
import { MTGModel } from "../api/api.tsx";

  const customCreateMemoryRouter = (mockedData: Record<"cards", MTGModel[] | never[]>) => {
	const routes = [
		{
		  path: "/",
		  element: <Root />,
		  loader: () => {return mockedData},
		  children: [{
			  path: 'cards',
			  element: <SearchResult/>,
		  }]
		},
	  ];

	  const router = createMemoryRouter(routes, {
		initialEntries: ["/", "/cards"],
		initialIndex: 0,
	  });
	return (router);
  }

  test("Card List renders the specified number of cards", async () => {
	const router = customCreateMemoryRouter(mockedData);

	render(
		<StateProvider defaultState={{...DEFAULT_STATE, result: mockedData.cards}}>
			<RouterProvider router={router} />
		</StateProvider>
	);
	await waitFor(() => {
		const cards =  getByTestId(document.body, "cards");
		expect(getAllByTestId(cards, "card")).toHaveLength(mockedData.cards.length);
  	})
  });

  test("Appropriate message is displayed if no cards are present", async () => {
	const router = customCreateMemoryRouter({cards: []});
	render(
		<StateProvider defaultState={{...DEFAULT_STATE, result: []}}>
			<RouterProvider router={router} />
		</StateProvider>
	);
	await waitFor(() => {
		const cards =  getByTestId(document.body, "cards");
		expect(cards).toHaveTextContent('No cards found');
  	})
  });
