import React, { useState } from 'react';
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

import { styled } from '@mui/system';
import { useOrder } from '../contextAPI/OrderContext';

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
  filter: grayscale(20%);
  transition: filter 0.3s ease-in-out;
  width: 100%;
  border: 1px solid lightgrey;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.25rem;

  &:hover {
    filter: none;
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
  const [quantity, setQuantity] = useState<number>(0);
  const isProductInStock = product.variants[0]?.stockLevel === 'IN_STOCK';

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToOrder = () => {
    const productWithQuantity: Product = {
      ...product,
      totalQuantity: quantity,
    };
    addItemToOrder(productWithQuantity);
  };

  return (
    <StyledCard>
      <CardContent>
        <CardMedia>
          {product.assets?.length > 0 && (
            <img
              src={product.assets[0]?.source}
              alt={product.name}
              style={{
                height: '150px',
                width: '100%',
                borderRadius: '5px',
                objectFit: 'cover',
                objectPosition: 'center',
                marginBottom: '25px',
                filter: 'grayscale(50%)',
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
          {product.variants.find((variant) => variant)?.currencyCode}
          {product.variants.find((variant) => variant)?.price}
        </Typography>
        <StyledDescription variant="body2" gutterBottom>
          {product.description}
        </StyledDescription>
      </CardContent>
      <CardActions
        sx={{
          height: '40px',
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
          onClick={() => handleAddToOrder(product)}
          disabled={!isProductInStock}
          sx={{ borderRadius: '2rem' }}
        >
          <AddShoppingCartRoundedIcon />
          Agregar
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ProductCard;
