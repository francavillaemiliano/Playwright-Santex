import React from 'react';
import { useOrder } from '../contextAPI/OrderContext';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import PrimaryButton from './common/PrimaryButton';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  onCartEmpty: () => void;
}

const CustomDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  itemId,
  onCartEmpty,
}) => {
  const { order, setOrder } = useOrder();

  const handleRemoveItemCart = (itemIdToRemove: string) => {
    const updatedOrder = order.filter((item) => item.id !== itemIdToRemove);
    setOrder(updatedOrder);
    if (updatedOrder.length === 0) {
      onCartEmpty();
    }
    onClose();
  };

  const itemName = order.find((item) => item.id === itemId)?.name;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        Are you sure you want to remove item/s:
        <strong>{itemName}</strong> from cart?
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <PrimaryButton
          onClick={() => handleRemoveItemCart(itemId)}
          text="Remove Item"
        />
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
