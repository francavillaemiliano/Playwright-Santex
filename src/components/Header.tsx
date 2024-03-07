import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: '#e74c3c', width: '100%' }}
    >
      <Toolbar>
        <img
          src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
          alt="logo"
          style={{ marginRight: '8px', height: '40px' }}
        />
        <Typography variant="h6" component="div">
          $ 0
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
