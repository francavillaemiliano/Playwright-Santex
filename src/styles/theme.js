import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#a1352a',
      main: '#e74c3c',
      light: '#eb6f63',
      contrastText: 'white',
    },
    secondary: {
      dark: '#00695f',
      main: '#009688',
      light: '#33ab9f',
    },
  },
});

export default theme;
