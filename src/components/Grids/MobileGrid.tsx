import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { Product } from '../../utils/types';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import ProductCard from '../ProductCard/ProductCard';
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  CircularProgress,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin: 5rem auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  && {
    top: 4rem;
    height: 0.35rem;
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  && {
    top: 2rem;
    height: 0.35rem;
    align-self: center;
    justify-self: center;
  }
`;

const MobileGrid = () => {
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const loadMore = () => {
    if (page) {
      fetchMore({
        variables: {
          options: {
            take: pageSize,
            skip: page * pageSize,
          },
        },

        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            products: {
              ...fetchMoreResult.products,
              items: [
                ...prev.products.items,
                ...fetchMoreResult.products.items,
              ],
            },
          };
        },
      }).then(() => {
        setPage(page + 1);
        setIsFetching(false);
      });
    }
  };

  const { loading, error, data, fetchMore } = useQuery<{
    products: { items: Product[]; totalItems: number };
  }>(GET_PRODUCTS, {
    variables: {
      options: {
        take: pageSize,
        skip: 0,
      },
    },
  });
  const [isFetching, setIsFetching] = useInfiniteScroll(loadMore);
  const allProductsLoaded =
    data?.products?.items.length === data?.products?.totalItems;

  return (
    <>
      {loading && <StyledLinearProgress color="secondary" />}
      {error && <Typography variant="h6">Error: {error.message}</Typography>}
      {data && (
        <StyledContainer>
          <Grid container spacing={4}>
            {(data?.products?.items || []).map(
              (product: Product, index: number) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.name + index}
                >
                  <ProductCard product={product} key={product.id} />
                </Grid>
              )
            )}
          </Grid>
          {!allProductsLoaded && isFetching && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                padding: '20px 0px',
              }}
            >
              <StyledCircularProgress color="secondary" />
            </Box>
          )}
        </StyledContainer>
      )}
    </>
  );
};

export default MobileGrid;
