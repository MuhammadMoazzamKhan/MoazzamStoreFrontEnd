import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import UserPage from './pages/UserPage';
import LoginPage from './pages/Login And Register/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterPage from './pages/Login And Register/Register';
import CartDetails from './pages/CartDetails/CartDetails';
import Account from './pages/Profile/Account';

// ----------------------------------------------------------------------

export default function Router({isAuthenticated}) {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/products" />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage />, index: true },
        { path: 'products/:keyword', element: <ProductsPage /> },
        { path: "app", element: <DashboardAppPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'account', element: isAuthenticated ? <Account /> : <LoginPage /> },
        { path: "products/detail/:id", element: <CartDetails /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/products" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}