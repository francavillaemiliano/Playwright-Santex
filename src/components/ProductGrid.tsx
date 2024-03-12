import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import ProductCard from './ProductCard';
import styled from 'styled-components';
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';

const StyledContainer = styled(Container)`
  margin: 80px auto;
  padding: 2px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  && {
    top: 6.75%;
    height: 0.35rem;
  }
`;

const ProductGrid = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      options: {
        take: 12,
        skip: 0,
      },
    },
  });

  return (
    <>
      {loading && (
        <Box width="100%" height="100vh">
          <StyledLinearProgress color="secondary" />
        </Box>
      )}
      {error && <Typography variant="h6">Error: {error.message}</Typography>}
      {data && (
        <StyledContainer>
          <Grid container spacing={4}>
            {(data?.products?.items || []).map((product: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} key={product.id} />
              </Grid>
            ))}
          </Grid>
        </StyledContainer>
      )}
    </>
  );
};

export default ProductGrid;
