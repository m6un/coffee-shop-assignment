import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import CoffeeShopList from '../pages/CoffeeShopList';
import CoffeeShopDetails from '../pages/CoffeeShopDetails';
import ErrorPage from '../pages/ErrorPage';

const pageRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<CoffeeShopList />} />
      <Route path="/shop/:id" element={<CoffeeShopDetails />} />
    </Route>,
  ),
);

export default pageRoutes;
