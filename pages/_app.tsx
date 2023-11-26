import '../styles/global.css';
import { wrapper } from '../app/store.tsx';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary.tsx';

export function App({ Component, pageProps }) {
  return (
    <div>
      <ErrorBoundary>
        <Component {...pageProps} />;
      </ErrorBoundary>
    </div>
  );
}

export default wrapper.withRedux(App);
