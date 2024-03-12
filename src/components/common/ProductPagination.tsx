import React from 'react';
import { Pagination } from '@mui/material';
import { Page } from '../../utils/types';

const ProductPagination: React.FC<Page> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination
      color="secondary"
      size="large"
      count={totalPages}
      page={currentPage}
      onChange={(event, page) => onPageChange?.(page)}
    />
  );
};

export default ProductPagination;
