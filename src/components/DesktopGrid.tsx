import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../utils/types';
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

const DesktopProductGrid = () => {
  const [page, setPage] = useState({ currentPage: 1, totalPages: 1 });
  const pageSize = 12;

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      options: {
        take: pageSize,
        skip: (page.currentPage - 1) * pageSize,
      },
    },
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
      {loading && <StyledLinearProgress color="secondary" />}
      {error && <Typography variant="h6">Error: {error.message}</Typography>}
      {data && (
        <StyledContainer>
          <Grid container spacing={4}>
            {(data?.products?.items || []).map((product: Product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} key={product.id} />
              </Grid>
            ))}
          </Grid>
          <StyledBox>
            <ProductPagination
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              onPageChange={handlePageChange}
            />
          </StyledBox>
        </StyledContainer>
      )}
    </>
  );
};

export default DesktopProductGrid;
