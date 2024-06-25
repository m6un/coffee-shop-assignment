import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import theme from './themes';

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

CustomThemeProvider;

export default CustomThemeProvider;
