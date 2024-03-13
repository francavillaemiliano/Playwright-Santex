import React from 'react';
import { IconButton, Typography, Stack } from '@mui/material';
import { Remove, Add } from '@mui/icons-material';
import { IncrementButtonProps } from '../../utils/types';

const IncrementButton: React.FC<IncrementButtonProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={onDecrement}>
        <Remove />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton onClick={onIncrement}>
        <Add />
      </IconButton>
    </Stack>
  );
};

export default IncrementButton;
