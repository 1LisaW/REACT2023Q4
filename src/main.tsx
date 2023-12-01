import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx'
import './index.css';
import { Link, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './store/store';

import AuthForm from './AuthForm';
import { Provider } from 'react-redux';

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
            <AuthForm/>
          </div>
        ),
      },
      {
        path: 'smth',
        element: <div>smth</div>,
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
