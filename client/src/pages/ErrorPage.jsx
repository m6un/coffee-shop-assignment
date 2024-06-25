import { Box, Stack, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <Stack
      width={'100%'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      padding={6}
    >
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="h6">Sorry, an unexpected error has occurred.</Typography>
      <Box padding={4} bgcolor={'error.main'} borderRadius={1} mt={2}>
        <Typography variant="h7">
          <i>{error.statusText || error.message}</i>
        </Typography>
      </Box>
    </Stack>
  );
}

export default ErrorPage;
