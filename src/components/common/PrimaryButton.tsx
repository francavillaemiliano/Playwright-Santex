import React from 'react';
import { PrimaryButtonProps } from '../../utils/types';
import { Button } from '@mui/material';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  && {
    border-radius: 2rem;
  }
`;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  disabled,
  icon,
  text,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      variant="contained"
      color="secondary"
      disabled={disabled}
      startIcon={icon}
    >
      {text}
    </StyledButton>
  );
};

export default PrimaryButton;
