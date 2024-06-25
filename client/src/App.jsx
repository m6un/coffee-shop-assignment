import { CssBaseline } from '@mui/material';
import { Fragment } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import ThemeProvider from './theme/Provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Main App component: sets up the app's core structure and providers
function App() {
  const queryClient = new QueryClient();
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <CssBaseline>
            <RouterProvider router={routes} />
          </CssBaseline>
        </ThemeProvider>
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
