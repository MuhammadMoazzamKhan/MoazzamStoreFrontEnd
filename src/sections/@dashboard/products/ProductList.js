import PropTypes from 'prop-types';
// @mui
import { Grid,Typography,Stack } from '@mui/material';
import ShopProductCard from './ProductCard';
// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.length > 0 ? products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      )): <Stack spacing={3}  >
      <Typography variant="h3" gutterBottom>
        No Product
      </Typography>
      </Stack> }
    </Grid>
  );
}
