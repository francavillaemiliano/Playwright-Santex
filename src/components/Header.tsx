import React from 'react';

import { useOrder } from '../contextAPI/OrderContext';
import priceFormatter from '../utils/priceFormatter';
import CustomDrawer from './CustomDrawer';

import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  width: 100%;
  position: fixed;
`;

const StyledToolbar = styled(Toolbar)`
  && {
    display: grid;
    grid-template-columns: 2fr 0.5fr 0.5fr;
    align-items: center;
    justify-items: center;
  }
`;

const Header = () => {
  const { order } = useOrder();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const itemsTotal = order.reduce((acc, item) => acc + item.totalQuantity, 0);
  const formattedSubtotal = priceFormatter(
    order.reduce((acc, item) => acc + item.subtotal, 0),
    order.length > 0 ? order[0]?.currency : ''
  );
  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <StyledAppBar color="primary">
        <StyledToolbar>
          <img
            src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
            alt="logo"
            style={{ height: '30px' }}
          />
          <Typography variant="body1">{formattedSubtotal}</Typography>
          <IconButton
            color="inherit"
            onClick={handleToggleDrawer}
            sx={{ height: '50px', width: '50px' }}
          >
            <Badge badgeContent={itemsTotal} color="error">
              <ShoppingCartRoundedIcon />
            </Badge>
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
      <CustomDrawer
        itemsTotal={itemsTotal}
        isOpen={isDrawerOpen}
        onClose={handleToggleDrawer}
      />
    </>
  );
};

export { Header };
