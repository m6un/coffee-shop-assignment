import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import CofeeLogo from '../assets/coffee-sipper-logo.png';

const Header = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: 'appwhite.main',
        boxShadow: 'none',
        borderBottom: (theme) => `1px dashed ${theme.palette.grey.lighter}`,
      }}
    >
      <Toolbar
        sx={{
          height: '75px',
          padding: '0px !important',
          marginLeft: { xs: 6, sm: 12, md: 16, lg: 24 },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <img src={CofeeLogo} style={{ width: '20px', height: '30px' }} alt="Coffee Logo" />
          <Typography color={'primary.main'} variant="h5" sx={{ fontFamily: 'Poppins' }}>
            Coffee Shop Finder
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
