import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './store/store';

import AuthHookForm from './components/AppHookForm/AuthHookForm';
import AuthForm from './AuthForm';
import { Provider } from 'react-redux';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        Hello
        <nav>
          <ul>
            <li>
              <Link to="auth">Auth</Link>
            </li>
            <li>
              <Link to="smth">smth</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: 'auth',
        element: (
          <div>
            <AuthForm />
          </div>
        ),
      },
      {
        path: 'smth',
        element: <AuthHookForm/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
