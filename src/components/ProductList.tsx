import { Box, Container, Grid, LinearProgress } from '@mui/material';

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

  if (loading)
    return (
      <Box sx={{ width: '100%', height: '100vh' }}>
        <LinearProgress
          color="secondary"
          sx={{ top: '6.75%', height: '0.35rem' }}
        />
      </Box>
    );

  if (error) return <p>Error: {error.message}</p>;

  const productList = data.products.items;

  return (
    <Container sx={{ margin: ' 80px auto', padding: 2 }}>
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
