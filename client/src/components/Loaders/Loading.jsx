import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';

// Simple loading spinner component, centered in its container
function Loading(styles) {
  return (
    <Stack sx={{ height: '100%', width: '100%' }} justifyContent="center" alignItems="center">
      <CircularProgress sx={styles} color="primary" thickness={3} size={20} />
    </Stack>
  );
}

export default Loading;
