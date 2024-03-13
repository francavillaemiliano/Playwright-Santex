import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';
import { useOrder } from '../contextAPI/OrderContext';
import priceFormatter from '../utils/priceFormatter';
import { Product } from '../utils/types';
import PrimaryButton from './common/PrimaryButton';
import IncrementButton from './common/IncrementButton';

import styled from 'styled-components';
import {
  Alert,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Snackbar,
} from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { useTheme } from '@mui/material/styles';

const StyledCard = styled(Card)`
  width: 100%;
  border: 1px solid lightgrey;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.25rem;

  &:hover {
    border: 1px solid grey;
  }
`;

const StyledDescription = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
`;

const StyledCardActions = styled(CardActions)`
  height: 3rem;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 10rem;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  object-position: center;
  margin-bottom: 1.5rem;
`;

const StyledBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightgrey;
    color: darkgrey;
    height: 10rem;
    width: 100%;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const ProductCard = ({ product }: { product: Product }) => {
  const { addItemToOrder, setOrder, order } = useOrder();

  const [addItemToOrderMutation] = useMutation(ADD_ITEM_TO_ORDER);
  const theme = useTheme();

  const customBackgroundColor = theme.palette.primary.light;
  const [quantity, setQuantity] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const formattedPrice = priceFormatter(
    product.variants?.[0]?.price,
    product.variants?.[0]?.currencyCode
  );
  const productImage =
    product.assets && product.assets.length > 0 && product.assets[0]?.source;

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToOrder = async (productId: string, quantity: number) => {
    if (quantity === 0) return;
    try {
      await addItemToOrderMutation({
        variables: { productVariantId: productId, quantity: quantity },
      });

      const duplicatedItemIndex = order.findIndex(
        (item) => item.id === product.id
      );

      if (duplicatedItemIndex !== -1) {
        const duplicatedItem = order[duplicatedItemIndex];
        const updatedQuantity = duplicatedItem.totalQuantity + quantity;
        const updatedSubtotal = product.variants[0]?.price * updatedQuantity;

        const updatedItem = {
          ...duplicatedItem,
          totalQuantity: updatedQuantity,
          subtotal: updatedSubtotal,
        };

        const updatedOrder = [...order];
        updatedOrder[duplicatedItemIndex] = updatedItem;
        setOrder(updatedOrder);
      } else {
        const cartItem: Product = {
          currency: product.variants[0]?.currencyCode,
          id: product.id.toString(),
          name: product.name,
          total: product.variants[0]?.price,
          subtotal: product.variants[0]?.price * quantity,
          totalQuantity: quantity,
          variants: product.variants,
        };
        addItemToOrder(cartItem);
      }

      setQuantity(0);
      setAlertOpen(true);
    } catch (error) {
      console.error('Error adding item to order:', error);
    }
  };

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert icon={false} sx={{ backgroundColor: customBackgroundColor }}>
          Item was successfully added to the cart!
        </Alert>
      </Snackbar>
      <StyledCard>
        <StyledCardContent>
          {productImage ? (
            <StyledCardMedia
              data-testid="image-container"
              image={productImage}
              title={product.name}
            />
          ) : (
            <StyledBox>No image</StyledBox>
          )}
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {formattedPrice}
          </Typography>
          <StyledDescription variant="body2" gutterBottom>
            {product.description}
          </StyledDescription>
        </StyledCardContent>
        <StyledCardActions>
          <IncrementButton
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <PrimaryButton
            onClick={() => handleAddToOrder(product.id, quantity)}
            icon={<AddShoppingCartRoundedIcon />}
            text="Add"
          />
        </StyledCardActions>
      </StyledCard>
    </>
  );
};

export default ProductCard;
