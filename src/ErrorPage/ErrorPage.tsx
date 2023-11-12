import { isRouteErrorResponse, useRouteError } from 'react-router';

const ErrorPage = (): JSX.Element => {
  const error = useRouteError();
  let errMessage: string;
  console.log(error);
  if (isRouteErrorResponse(error)) {
    errMessage = error.statusText;
  } else if (error instanceof Error) errMessage = error.message;
  else if (typeof error === 'string') errMessage = error;
  else errMessage = 'Unknown error';
  return (
    <div data-testid={'ErrorPage'}>
      <h1>Oops...</h1>
      <p>page not found.</p>
      <p>{errMessage}</p>
    </div>
  );
};

export default ErrorPage;
