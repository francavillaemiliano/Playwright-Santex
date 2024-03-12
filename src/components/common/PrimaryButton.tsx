import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  && {
    border-radius: 2rem;
  }
`;

interface PrimaryButtonProps extends ButtonProps {
  disabled?: boolean;
  icon?: React.ReactNode;
  text: string;
}

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
