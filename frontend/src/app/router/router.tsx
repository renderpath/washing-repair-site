import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../../pages/home/HomePage';
import { AdminLoginPage } from '../../pages/admin-login/AdminLoginPage';
import { AdminPage } from '../../pages/admin/AdminPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/admin/login',
        element: <AdminLoginPage />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
    },
]);