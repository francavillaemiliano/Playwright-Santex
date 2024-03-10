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
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { styled } from '@mui/system';
import { useOrder } from '../contextAPI/OrderContext';
import usePriceFormatter from '../hooks/usePriceFormatter';

import IncrementButton from './IncrementButton';

interface Product {
  id: number;
  description: string;
  name: string;
  assets: Asset[];
  variants: ProductVariant[];
  totalQuantity: number;
  total: number;
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
  const { addItemToOrder } = useOrder();
  const total = usePriceFormatter(
    product.variants[0]?.price,
    product.variants[0]?.currencyCode
  );
  const isProductInStock = product.variants[0]?.stockLevel === 'IN_STOCK';
  const [quantity, setQuantity] = useState<number>(0);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToOrder = () => {
    const lineItem = {
      id: product.id,
      name: product.name,
      variants: product.variants[0],
      currency: product.variants[0].currencyCode,
      totalQuantity: quantity,
      total: total,
    };
    addItemToOrder(lineItem);
    setQuantity(0);
    setAlertOpen(true);
  };

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setAlertOpen(false)}>
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
              Sin Stock
            </Typography>
          )}
          <Typography variant="body1" gutterBottom>
            {total}
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
            onClick={() => handleAddToOrder()}
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
