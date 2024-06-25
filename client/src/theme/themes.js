import { createTheme } from '@mui/material/styles';

import palette from './palette';
import ComponentsOverrides from './overrides';
import typography from './typography';

// Define base theme options
const themeOptions = {
  palette,
  typography,
};

// Create the theme using base options
const theme = createTheme(themeOptions);

// Apply component overrides to the theme
theme.components = ComponentsOverrides(theme);

export default theme;
