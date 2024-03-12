import { Header } from './components/Header';
import ProductGrid from './components/ProductGrid';

const App = () => {
  return (
    <>
      <Header data-testid="header" />
      <ProductGrid data-testid="product-grid" />
    </>
  );
};

export default App;
