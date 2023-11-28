import React from 'react';

const ErrorPage = (): JSX.Element => {
  return (
    <div data-testid={'ErrorPage'}>
      <h1>Oops...</h1>
      <p>page not found.</p>
    </div>
  );
};

export default ErrorPage;
