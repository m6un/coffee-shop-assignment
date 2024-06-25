import CssBaseline from './CssBaseline.js';
import { Components } from '@mui/material';
import { Theme } from '@mui/material/styles';

export default function ComponentsOverrides(theme: Theme): Components {
  return Object.assign(CssBaseline());
}
