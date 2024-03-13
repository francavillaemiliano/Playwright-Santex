import React from 'react';
import { Page } from '../../utils/types';
import { Pagination } from '@mui/material';

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
