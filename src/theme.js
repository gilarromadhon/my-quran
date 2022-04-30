import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      // main: '#556cd6',
      main: '#FFCD00',
    },
    secondary: {
      main: '#FFCD00',
    },
    background: {
      main: '#1E2237',
      card: '#2A2E46',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;