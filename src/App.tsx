import Header from './components/Header/Header';
import ProductGrid from './components/Grids/ProductGrid';

const App = () => {
  return (
    <>
      <Header data-testid="header" />
      <ProductGrid data-testid="product-grid" />
    </>
  );
};

export default App;
