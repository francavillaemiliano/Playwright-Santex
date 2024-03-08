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

import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';

import IncrementButton from './IncrementButton';

interface Product {
  id: number;
  description: string;
  name: string;
  assets: Asset[];
  variants: ProductVariant[];
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

const StyledDescription = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const ProductCard = ({ product }: { product: Product }) => {
  const [addItemToOrderMutation] = useMutation(ADD_ITEM_TO_ORDER);
  const isProductInStock = product.variants[0]?.stockLevel === 'IN_STOCK';

  const [quantity, setQuantity] = useState<number>(0);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToOrder = (productVariantId: string, quantity: number) => {
    addItemToOrderMutation({
      variables: { productVariantId, quantity },
    })
      .then((response) => {
        console.log('se agrega al carrito');
      })
      .catch((error) => {});
  };

  return (
    <Card
      sx={{
        width: '100%',
        border: '1px solid lightgrey',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0.25rem',
      }}
    >
      <CardContent>
        <CardMedia>
          {product.assets?.length > 0 && (
            <img
              src={product.assets[0]?.source}
              alt={product.name}
              style={{
                height: '150px',
                width: '100%',
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
        <Typography variant="body1" gutterBottom>
          {product.variants[0]?.currencyCode}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {product.variants[0]?.price}
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
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleAddToOrder(product.variants[0]?.id, quantity)}
          disabled={!isProductInStock}
          sx={{ borderRadius: '2rem' }}
        >
          <AddShoppingCartRoundedIcon />
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
