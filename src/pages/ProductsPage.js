import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import { allProductRequest, allProductSeccess, allProductFail } from '../reduxStore/slice/ProductSlice';
import storeContext from '../store/storeContext';

// components
import { ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
import Loading from './Loader/Loading';


export default function ProductsPage() {


  const { error, product, success, productsCount, loading } = useSelector(state => state.product)
  const dispatch = useDispatch()
  const getAllProduct = async () => {
    try {
      await dispatch(allProductRequest())
      const { data } = await axios('http://localhost:8000/api/v1/products')
      await dispatch(allProductSeccess({ product: data.products, productsCount: data.productCount }))
    } catch (error) {
      console.log(error)
      dispatch(allProductFail({ error: error.response }))
    }
  }
  useEffect(() => {
    getAllProduct()
  }, [dispatch])





  const [openFilter, setOpenFilter] = useState(false);
  const context = useContext(storeContext);
  // const {filter,product} = context;



  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Products | Moazzam Store </title>
      </Helmet>
      {loading ? <Loading /> :
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            {"Products"}
          </Typography>

          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilterSidebar
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
            </Stack>
          </Stack>

          <ProductList products={product} />
        </Container>}
    </>
  );
}
