import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactStars from 'react-stars'
// utils
import { useContext, useState } from 'react';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import CartDetails from './CartDetails';
import storeContext from '../../../store/storeContext';


const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// ----------------------------------------------------------------------

const theme = {
  transition: "all 0.5s",
  '&:hover': {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    transform: 'translateY(-1vmax)'
  }
}

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};



export default function ShopProductCard({ product }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const { setCart } = useContext(storeContext)
  const navigate = useNavigate();

  const navigateToDetail = ()=>{
    navigate(`/dashboard/products/detail/${product.name}`)
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const { name, images, price, ratings, _id } = product;
  // const addCart = () => {
  //   const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  //   const index = cartData.findIndex(i => i._id === product._id);
  //   if (index !== -1) {
  //     cartData.splice(index, 1, { ...cartData[index], qty: cartData[index].qty + 1 })
  //   } else {
  //     cartData.push({ ...product, qty: 1 })
  //   }
  //   localStorage.setItem("cart", JSON.stringify(cartData))
  //   setCart(cartData)
  //   setOpen(true)
  // }


  const stating = ["sale", "new"];
  const status = stating[Math.round(Math.random() * stating.length)]
  const pricing = [price + Math.ceil(Math.random() * 50), false]
  const rate = pricing[Math.round(Math.random() * pricing.length)]

  return (
    <Card sx={{ ...theme }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={images[0].url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography noWrap>
            <ReactStars
              edit={false}
              value={ratings || 3.5}
              size={20}
            />
          </Typography>

          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {rate && fCurrency(Math.ceil(rate))}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle2" noWrap>
            Reviews (200)
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained" sx={{ backgroundColor: '#388087' }}>
            Add Cart
          </Button>
          <Button onClick={navigateToDetail} sx={{ backgroundColor: '#C2EDCE', color: "black" }} variant="outlined">
            Details
          </Button>
          {/* <CartDetails
            openFilter={openFilter}
            onCloseFilter={handleCloseFilter}
            cartData={product}
            disRate={rate}
          /> */}
        </Stack>
        <Snackbar className='top' anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={() => { setOpen(false) }}>
          <Alert onClose={() => { setOpen(false) }} severity="info"
            icon={false}
            sx={{ width: "100%" }}>
            Product added successfully.
          </Alert>
        </Snackbar>
      </Stack>
    </Card>
  );
}

