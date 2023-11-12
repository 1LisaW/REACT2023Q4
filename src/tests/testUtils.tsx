import Details from '../Result/Details/Details';
import SearchResult from '../Result/SearchResult';
import mockedData from '../Result/stubs/stub';
import Root from '../routes/Root';
import { loader as detailsLoader } from '../Result/Details/Details';

export const routesAllTree = () => {
  return [
    {
      path: '/',
      element: <Root />,
      loader: () => {
        return mockedData;
      },
      children: [
        {
          path: 'cards',
          element: <SearchResult />,
          children: [
            {
              path: 'details/:id',
              element: <Details />,
              loader: detailsLoader,
            },
          ],
        },
      ],
    },
  ];
};
