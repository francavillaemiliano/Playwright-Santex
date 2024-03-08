import { ThemeProvider } from '@mui/material/styles';

import theme from './styles/theme';

import { Header } from './components/Header';
import { ProductList } from './components/ProductList';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div>
        <ProductList />
      </div>
    </ThemeProvider>
  );
};

export default App;
