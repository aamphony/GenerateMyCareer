import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>{JSON.stringify(error)}</div>;
};

export default ErrorPage;
