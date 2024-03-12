import React from 'react';
import { useOrder } from '../contextAPI/OrderContext';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import PrimaryButton from './common/PrimaryButton';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string | undefined;
  onCartEmpty: () => void;
}

const CustomDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  itemId,
  onCartEmpty,
}) => {
  const { order, setOrder } = useOrder();

  const handleClose = () => {
    onClose();
  };

  const handleRemoveItemCart = (itemIdToRemove: string) => {
    const updatedOrder = order.filter((item) => item.id !== itemIdToRemove);
    setOrder(updatedOrder);
    if (updatedOrder.length === 0) {
      onCartEmpty();
    }
    handleClose();
  };

  const itemName = itemId ? order.find((item) => item.id === itemId)?.name : '';

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        Are you sure you want to remove item/s:{' '}
        {itemId ? <strong>{itemName}</strong> : ''} from cart?
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <PrimaryButton
          onClick={() => itemId && handleRemoveItemCart(itemId)}
          text="Remove Item"
        />
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
