import React from 'react';
import { IconButton, Typography, Stack } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface IncrementButtonProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled: boolean;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  disabled,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={onDecrement} disabled={disabled}>
        <RemoveIcon />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton onClick={onIncrement} disabled={disabled}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
};

export default IncrementButton;
