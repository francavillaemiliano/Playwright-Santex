import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useOrder } from '../contextAPI/OrderContext';
import priceFormatter from '../utils/priceFormatter';

interface CustomDrawerProps {
  itemsTotal: number;
  isOpen: boolean;
  onClose: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  itemsTotal,
  isOpen,
  onClose,
}) => {
  const { order, setOrder, totalPriceOrder, currency } = useOrder();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState<string | null>(null);

  const formattedTotal = priceFormatter(totalPriceOrder, currency);

  const handleConfirmRemoveItem = (itemId: string) => {
    setIsDialogOpen(true);
    setItemIdToRemove(itemId);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setItemIdToRemove(null);
  };

  const handleRemoveItemCart = (itemId: string) => {
    const updatedOrder = order.filter((item) => item.id !== itemId);
    setOrder(updatedOrder);
    handleClose();
  };

  const handleEmptyCart = () => {
    setOrder([]);
    onClose();
  };

  const handleBuyProducts = async () => {
    // terminamos el flujo de compra, vaciando la orden y cerrando el drawer
    onClose();
    setOrder([]);
  };

  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
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
            onClick={onClose}
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
              <LocalMallOutlinedIcon color="primary" />
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                There're no items in your
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                cart, add some
              </Typography>
            </Box>
          )}
          {itemsTotal !== 0 && (
            <Box>
              <Typography key="order-title" variant="h6" gutterBottom>
                Order:
              </Typography>
              <List sx={{ width: '100%' }}>
                <ListItem
                  key={itemsTotal}
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
                    <>
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <IconButton
                            color="secondary"
                            sx={{ height: '30px', width: '30px' }}
                            onClick={() => handleConfirmRemoveItem(item.id)}
                          >
                            <CloseRoundedIcon />
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
                    </>
                  );
                })}
              </List>
              <Typography variant="h6" sx={{ textAlign: 'right', mr: '2rem' }}>
                Total: {formattedTotal}
              </Typography>
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
                  onClick={handleBuyProducts}
                  sx={{
                    borderRadius: '2rem',
                    marginTop: '1rem',
                    width: '60%',
                  }}
                >
                  Buy
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    marginTop: '1rem',
                  }}
                  onClick={handleEmptyCart}
                >
                  Empty Cart
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
      </Drawer>
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onClose={handleClose}>
          <DialogContent>
            Are you sure you want to remove item/s:{' '}
            {itemIdToRemove && (
              <strong>
                {order.find((item) => item.id === itemIdToRemove)?.name}
              </strong>
            )}{' '}
            from cart ?
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ borderRadius: '2rem' }}
              onClick={() =>
                itemIdToRemove && handleRemoveItemCart(itemIdToRemove)
              }
              autoFocus
            >
              Remove Items
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CustomDrawer;
