import React, { useState } from 'react';
import {
  Alert,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Snackbar,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';

import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useOrder } from '../contextAPI/OrderContext';
import priceFormatter from '../utils/priceFormatter';

import IncrementButton from './IncrementButton';

interface Product {
  id: string;
  description: string;
  name: string;
  assets: Asset[];
  variants: ProductVariant[];
  totalQuantity: number;
  total: number;
  subtotal: number;
}

interface ProductVariant {
  id: string;
  price: number;
  currencyCode: string;
  stockLevel: string;
}

interface Asset {
  id: string;
  source: string;
}

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

const ProductCard = ({ product }: { product: Product }) => {
  const { addItemToOrder, setOrder, order } = useOrder();

  const [addItemToOrderMutation] = useMutation(ADD_ITEM_TO_ORDER);
  const theme = useTheme();

  const customBackgroundColor = theme.palette.primary.light;
  const [quantity, setQuantity] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const formattedPrice = priceFormatter(
    product.variants[0]?.price,
    product.variants[0]?.currencyCode
  );
  const isProductInStock = product.variants[0]?.stockLevel === 'IN_STOCK';

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToOrder = async (productId: string, quantity: number) => {
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
        const cartItem = {
          currency: product.variants[0]?.currencyCode,
          id: product.id.toString(),
          name: product.name,
          total: product.variants[0]?.price,
          subtotal: product.variants[0]?.price * quantity,
          totalQuantity: quantity,
          variants: product.variants[0],
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
          Item was successfully added to the cart
        </Alert>
      </Snackbar>
      <StyledCard>
        <CardContent>
          <CardMedia>
            {product.assets?.length > 0 && (
              <img
                src={product.assets[0]?.source}
                alt={product.name}
                style={{
                  height: '10rem',
                  width: '100%',
                  borderRadius: '0.5rem',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  marginBottom: '1.5rem',
                }}
              />
            )}
          </CardMedia>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          {!isProductInStock && (
            <Typography color="primary" variant="body1">
              No Stock
            </Typography>
          )}
          <Typography variant="body1" gutterBottom>
            {formattedPrice}
          </Typography>
          <StyledDescription variant="body2" gutterBottom>
            {product.description}
          </StyledDescription>
        </CardContent>
        <CardActions
          sx={{
            height: '3rem',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <IncrementButton
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            disabled={!isProductInStock}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleAddToOrder(product.id, quantity)}
            disabled={!isProductInStock}
            sx={{ borderRadius: '2rem' }}
          >
            <AddShoppingCartRoundedIcon />
            Add
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
};

export default ProductCard;
