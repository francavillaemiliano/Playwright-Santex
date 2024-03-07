import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';
import { GET_PRODUCTS } from '../graphql/queries';

interface Product {
  id: number;
  description: string;
  name: string;
  assets: Asset[];
}

interface Asset {
  id: string;
  source: string;
}

const ProductList = () => {
  const [
    addItemToOrderMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_ITEM_TO_ORDER);

  const handleAddToOrder = (productId: number) => {
    addItemToOrderMutation({ variables: { productId } })
      .then((response) => {
        console.log('se agrega al carrito');
      })
      .catch((error) => {});
  };

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      options: {
        take: 10,
        skip: 0,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const productList = data.products.items;

  return (
    <Container>
      <Grid
        container
        xs={4}
        sm={6}
        m={8}
        lg={10}
        spacing={4}
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {productList.map((product: Product) => (
          <Grid item key={product.id}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                {product.assets.length > 0 && (
                  <img
                    src={product.assets[0]?.source}
                    alt={product.name}
                    style={{
                      height: '200px',
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                )}
                <Typography variant="body2" gutterBottom>
                  {product.description}
                </Typography>
              </CardContent>
              <CardMedia />
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleAddToOrder(product.id)}
                >
                  Agregar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export { ProductList };
