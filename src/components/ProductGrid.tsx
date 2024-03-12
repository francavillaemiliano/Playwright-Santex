import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { Page } from '../utils/types';
import useScrollPagination from '../utils/scrollPagination';

import ProductCard from './ProductCard';
import ProductPagination from './common/ProductPagination';
import styled from 'styled-components';
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

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

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

const ProductGrid = () => {
  const [page, setPage] = useState<Page>({ currentPage: 1, totalPages: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const pageSize = 8;

  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      options: {
        take: pageSize,
        skip: (page.currentPage - 1) * pageSize,
      },
    },
  });

  useScrollPagination({
    fetchMore: () => {
      if (fetchMore && data && data.products) {
        fetchMore({
          variables: {
            options: {
              take: pageSize,
              skip: page.currentPage * pageSize,
            },
          },
        });
        setPage((prevPage) => ({
          ...prevPage,
          currentPage: prevPage.currentPage + 1,
        }));
      }
    },
    containerRef,
    currentPage: page.currentPage,
    totalPages: Math.ceil(data?.products?.totalItems / pageSize) || 1,
    loading,
    pageSize,
    isSmallScreen: useMediaQuery('(max-width:600px)'),
  });

  useEffect(() => {
    if (data && data.products) {
      const totalPages = Math.ceil(data.products.totalItems / pageSize);
      setPage((prevPage) => ({ ...prevPage, totalPages }));
    }
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setPage((prevPage) => ({ ...prevPage, currentPage: newPage }));
  };

  return (
    <>
      {loading && (
        <Box width="100%" height="100vh">
          <StyledLinearProgress color="secondary" />
        </Box>
      )}
      {error && <Typography variant="h6">Error: {error.message}</Typography>}
      {data && (
        <>
          <StyledContainer ref={containerRef}>
            <Grid container spacing={4}>
              {(data?.products?.items || []).map((product: any) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} key={product.id} />
                </Grid>
              ))}
            </Grid>
            {!isSmallScreen && (
              <StyledBox>
                <ProductPagination
                  currentPage={page.currentPage}
                  totalPages={page.totalPages}
                  onPageChange={handlePageChange}
                />
              </StyledBox>
            )}
          </StyledContainer>
        </>
      )}
    </>
  );
};

export default ProductGrid;
