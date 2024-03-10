import React from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

import { useOrder } from '../contextAPI/OrderContext';
import { Stack } from '@mui/system';

const Header = () => {
  const { order, setOrder } = useOrder();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const itemsTotal = order.reduce((acc, item) => acc + item.totalQuantity, 0);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleEmptyCart = () => {
    setOrder([]);
    setIsDrawerOpen(false);
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
            <Badge badgeContent={itemsTotal} color="error">
              <ShoppingCartRoundedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleToggleDrawer}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '25rem',
            padding: '2rem',
            height: '100%',
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
            onClick={handleToggleDrawer}
          >
            <CloseRoundedIcon color="primary" />
          </IconButton>
          {itemsTotal === 0 && (
            <Box
              sx={{
                height: '20%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocalMallOutlinedIcon />
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                There're no items in your
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                cart, add some
              </Typography>{' '}
            </Box>
          )}
          {itemsTotal !== 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                Order:
              </Typography>
              <List sx={{ width: '100%' }}>
                <ListItem
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                  }}
                >
                  <ListItemText>Description:</ListItemText>
                  <ListItemText>Subtotal:</ListItemText>
                </ListItem>

                {order.map((item, index) => (
                  <>
                    <ListItem
                      key={index}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 0.25fr',
                        gap: 3,
                      }}
                    >
                      <Typography variant="body1">
                        {`${item.totalQuantity} x ${item.name}`}{' '}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ justifySelf: 'end' }}
                      >{` ${item.total}`}</Typography>
                      <IconButton
                        color="secondary"
                        sx={{ height: '30px', width: '30px' }}
                      >
                        <RemoveCircleOutlineOutlinedIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
              <Stack
                direction="column"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: '2rem',
                    marginTop: '1rem',
                    width: '60%',
                  }}
                >
                  Send Order
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    borderRadius: '2rem',
                    marginTop: '1rem',
                  }}
                  onClick={handleEmptyCart}
                >
                  Empty Cart
                </Button>
              </Stack>
            </>
          )}
        </Paper>
      </Drawer>
    </>
  );
};

export { Header };
