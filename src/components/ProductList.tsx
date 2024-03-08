import { Container, Grid } from '@mui/material';

import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';

import ProductCard from './ProductCard';

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      options: {
        take: 10,
        skip: 0,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const productList = data.products.items;

  return (
    <Container sx={{ margin: ' 80px auto' }}>
      <Grid container spacing={4}>
        {productList.map((product: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} key={product.id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export { ProductList };
