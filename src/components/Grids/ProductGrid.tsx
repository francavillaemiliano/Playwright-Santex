import React from 'react';
import MobileGrid from './MobileGrid';
import DesktopGrid from './DesktopGrid';
import useMediaQuery from '@mui/material/useMediaQuery';

const ProductGrid = () => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return isMobile ? <MobileGrid /> : <DesktopGrid />;
};

export default ProductGrid;
