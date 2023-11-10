import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root';
import ErrorBoundary from './ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './ErrorPage/ErrorPage';
import SearchResult from './Result/SearchResult';
import Details from './Result/Details/Details';
import { loader as resLoader } from './routes/Root';
import { loader as detailsLoader } from './Result/Details/Details';
import { StateProvider } from './StateContext/SearchContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: resLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'cards',
        shouldRevalidate: (args) => {
          return ![...args.currentUrl.searchParams.keys()].every(
            (key) =>
              key === 'details' ||
              args.currentUrl.searchParams.get(key) ===
                args.nextUrl.searchParams.get(key),
          );
        },
        element: <SearchResult />,

        children: [
          {
            path: 'details/:id',
            loader: detailsLoader,
            element: <Details />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StateProvider>
        <RouterProvider router={router} />
      </StateProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
