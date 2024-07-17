import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
