import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Stack } from '@mui/material';

const Layout = () => {
  return (
    <Stack height={'100%'} width={'100%'}>
      <Header />
      <Outlet />
    </Stack>
  );
};
export default Layout;
