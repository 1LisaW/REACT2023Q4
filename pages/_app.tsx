import '../styles/global.css';
import { createStore, wrapper } from '../app/store.tsx';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary.tsx';
import { Provider } from 'react-redux';

export function App({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(createStore);
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />;
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
