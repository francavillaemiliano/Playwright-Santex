import React, { useState } from 'react';
import { useOrder } from '../contextAPI/OrderContext';
import priceFormatter from '../utils/priceFormatter';
import CustomDialog from './CustomDialog';
import PrimaryButton from './common/PrimaryButton';

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { CloseRounded, LocalMallOutlined } from '@mui/icons-material';
import styled from 'styled-components';

interface CustomDrawerProps {
  itemsTotal: number;
  isOpen: boolean;
  onClose: () => void;
}

const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  height: 40px;
  width: 40px;
  align-self: end;
`;

const StyledBox = styled(Box)`
  height: 20%;
  width: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledList = styled(List)`
  width: 100%;
`;

const StyledStack = styled(Stack)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  gap: 20px;
`;

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  itemsTotal,
  isOpen,
  onClose,
}) => {
  const { order, setOrder, totalPriceOrder, currency } = useOrder();
  const [isConfirmDeleteOpen, SetIsConfirmDeleteOpen] = useState(false);
  const [itemId, setItemId] = useState('');
  const formattedTotal = priceFormatter(totalPriceOrder, currency);

  const handleConfirmRemoveItem = (itemId: string) => {
    SetIsConfirmDeleteOpen(true);
    setItemId(itemId);
  };

  const handleEmptyCart = () => {
    setOrder([]);
    onClose();
  };

  const handleBuyProducts = async () => {
    // terminamos el flujo de compra, vaciando la orden y cerrando el drawer
    // agregar un mensaje de confirmacion de compra enviada!

    setOrder([]);
    onClose();
  };

  return (
    <>
      <StyledDrawer anchor="right" open={isOpen} onClose={onClose}>
        <Paper sx={{ padding: '20px' }}>
          <StyledIconButton onClick={onClose}>
            <CloseRounded color="primary" />
          </StyledIconButton>
          {itemsTotal === 0 ? (
            <StyledBox>
              <LocalMallOutlined color="primary" />
              <Typography variant="body1">There're no items in your</Typography>
              <Typography variant="body1">cart, add some</Typography>
            </StyledBox>
          ) : (
            <Box>
              <Typography>Order:</Typography>
              <StyledList>
                <ListItem
                  key={itemId}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                  }}
                >
                  <ListItemText>Description:</ListItemText>
                  <ListItemText>Subtotal:</ListItemText>
                </ListItem>
                {order.map((item) => {
                  const formattedSubtotal = priceFormatter(
                    item.subtotal,
                    currency
                  );

                  return (
                    <React.Fragment key={`fragment-${item.id}`}>
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <IconButton
                            color="secondary"
                            sx={{ height: '30px', width: '30px' }}
                            onClick={() => handleConfirmRemoveItem(item.id)}
                          >
                            <CloseRounded />
                          </IconButton>
                        }
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr 0.25fr',
                          gap: 3,
                        }}
                      >
                        <Typography variant="body1">
                          {`${item.totalQuantity} x ${item.name}`}
                        </Typography>
                        <Typography variant="body1" sx={{ justifySelf: 'end' }}>
                          {formattedSubtotal}
                        </Typography>
                      </ListItem>
                      <Divider key={`divider-${item.id}`} />
                    </React.Fragment>
                  );
                })}
              </StyledList>
              <Typography variant="h6" sx={{ textAlign: 'right', mr: '2rem' }}>
                Total: {formattedTotal}
              </Typography>
              <StyledStack>
                <PrimaryButton
                  onClick={handleBuyProducts}
                  text="Confirm Order"
                />
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleEmptyCart}
                >
                  Empty Cart
                </Button>
              </StyledStack>
            </Box>
          )}
        </Paper>
      </StyledDrawer>
      <CustomDialog
        isOpen={isConfirmDeleteOpen}
        onClose={() => SetIsConfirmDeleteOpen(false)}
        itemId={itemId}
        onCartEmpty={() => onClose()}
      />
    </>
  );
};

export default CustomDrawer;
