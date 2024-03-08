import React from 'react';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

const Header = () => {
  const handleOnClick = () => {
    console.log('aca va a verse la orden');
  };

  return (
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
        <IconButton onClick={handleOnClick}>
          <ShoppingCartRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
