import React from 'react';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import CustomDrawer from './CustomDrawer';
import { useOrder } from '../contextAPI/OrderContext';
import priceFormatter from '../utils/priceFormatter';

const Header = () => {
  const { order } = useOrder();

  console.log(order, 'order');
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
      <AppBar position="fixed" color="primary" style={{ width: '100%' }}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: '0 70px',
          }}
        >
          <img
            src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
            alt="logo"
            style={{ height: '30px' }}
          />
          <Typography variant="body1">{formattedSubtotal}</Typography>
          <IconButton color="inherit" onClick={handleToggleDrawer}>
            <Badge badgeContent={itemsTotal} color="error">
              <ShoppingCartRoundedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <CustomDrawer
        itemsTotal={itemsTotal}
        isOpen={isDrawerOpen}
        onClose={handleToggleDrawer}
      />
    </>
  );
};

export { Header };
