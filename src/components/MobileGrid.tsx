import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../utils/types';
import ProductCard from './ProductCard';
import styled from 'styled-components';
import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';

const StyledContainer = styled(Container)`
  margin: 5rem auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  && {
    top: 6.75%;
    height: 0.35rem;
  }
`;

const MobileGrid = () => {
  const [page, setPage] = useState({ currentPage: 1, totalPages: 1 });
  const pageSize = 12;

  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      options: {
        take: pageSize,
        skip: 0,
      },
    },
  });

  const loadMore = () => {
    if (fetchMore && data && data.products) {
      if (page.currentPage < page.totalPages) {
        fetchMore({
          variables: {
            options: {
              take: pageSize,
              skip: page.currentPage * pageSize,
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
          setPage((prevPage) => ({
            ...prevPage,
            currentPage: prevPage.currentPage + 1,
          }));
        });
      }
    }
  };

  useEffect(() => {
    if (data && data.products) {
      const totalPages = Math.ceil(data.products.totalItems / pageSize);
      setPage({ currentPage: 1, totalPages });
    }
  }, [data]);

  return (
    <>
      {loading && <StyledLinearProgress color="secondary" />}
      {error && <Typography variant="h6">Error: {error.message}</Typography>}
      {data && (
        <StyledContainer>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={page.currentPage < page.totalPages}
            loader={<StyledLinearProgress key={0} color="secondary" />}
            useWindow={false}
            threshold={100}
          >
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
          </InfiniteScroll>
        </StyledContainer>
      )}
    </>
  );
};

export default MobileGrid;
