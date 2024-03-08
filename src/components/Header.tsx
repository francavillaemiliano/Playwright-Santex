import React from 'react';
import {
  AppBar,
  Badge,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useOrder } from '../contextAPI/OrderContext';

const Header = () => {
  const { order } = useOrder();

  console.log(order, 'ORDER ITEMS');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

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
            justifyContent: 'space-around',
            padding: '0 70px',
          }}
        >
          <img
            src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
            alt="logo"
            style={{ height: '30px' }}
          />
          <IconButton color="inherit" onClick={handleToggleDrawer}>
            <Badge badgeContent={order.length} color="error">
              <ShoppingCartRoundedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleToggleDrawer}
        variant="persistent"
        sx={{ width: '400px', padding: '20px' }}
      >
        <Paper sx={{ width: '400px', padding: '20px', height: '100%' }}>
          <IconButton
            sx={{ position: 'absolute', top: '10px', left: '10px' }}
            onClick={handleToggleDrawer}
          >
            <CloseRoundedIcon />
          </IconButton>
          <List>
            {order.map((item, index) => (
              <ListItem key={index}>
                <ListItemText>{`${item.totalQuantity} - ${item.name} - ${item.variants}`}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: '2rem',
              marginTop: '1rem',
              width: '80%',
            }}
          >
            COMPRAR
          </Button>
        </Paper>
      </Drawer>
    </>
  );
};

export { Header };
