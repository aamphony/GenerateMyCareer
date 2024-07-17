import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Error from './pages/Error';
import DashboardLayout from './layouts/Dashboard';
import CoverLettersPage from './pages/CoverLetters';

const router = createBrowserRouter([
  {
    path: '/login',
    errorElement: <Error />,
    element: <LoginPage />,
  },
  {
    path: '/register',
    errorElement: <Error />,
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/cover-letters',
        element: <CoverLettersPage />,
      },
      {
        path: '/profile',
        element: <div>Profile</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
