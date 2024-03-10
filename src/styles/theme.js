import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#565175',
      main: '#538a95',
      light: '#67b79e',
      contrastText: 'white',
    },
    secondary: {
      main: '#ffb727',
      contrastText: '#3d3d3d',
    },
    error: {
      main: '#e4491c',
    },
  },
});

export default theme;
