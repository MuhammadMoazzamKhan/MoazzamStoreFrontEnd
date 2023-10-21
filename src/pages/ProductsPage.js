import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// @mui
import Pagination from '@mui/material/Pagination';
import { Container, Stack, Typography } from '@mui/material';
import { allProductRequest, allProductSuccess, allProductFail } from '../reduxStore/slice/ProductSlice';
// components
import { ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
import Loading from './Loader/Loading';


export default function ProductsPage() {

  const dispatch = useDispatch()
  const [sliderPrice, setSliderPrice] =useState({ price: [0,25000], category: '', rating: 0 });

  const { error, product, success, productsCount, loading, resultPerPage, filterProductCount } = useSelector(state => state.product);
  
  const getAllProduct = async (keyword = "", currentPerPage = 1, price = [0, 25000],category,rating = 0) => {
    try {
      await dispatch(allProductRequest())

      let link = `http://localhost:8000/api/v1/products?keyword=${keyword}&page=${currentPerPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
      
      if(category){
        link =  `http://localhost:8000/api/v1/products?keyword=${keyword}&page=${currentPerPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
      }

      const { data } = await axios(link)

      await dispatch(allProductSuccess({ product: data.products, productsCount: data.productCount, resultPerPage: data.resultPerPage, filterProductCount: data.filterProductCount }))
     
    } catch (error) {
      dispatch(allProductFail({ error: error.response.data }))
    }
  }
  const [currentPerPage, SetCurrentPerPage] = useState(1)

  const currentPerPageNo = (e, value) => {
    SetCurrentPerPage(value)
  }

  const fetchPrice = (price) => {
    setSliderPrice(price)
  }


  const { keyword } = useParams();

  useEffect(() => {
    getAllProduct(keyword, currentPerPage, sliderPrice.price,sliderPrice.category,sliderPrice.rating)
  }, [dispatch, keyword, currentPerPage, sliderPrice])




  const [openFilter, setOpenFilter] = useState(false);


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
                fetchPrice={fetchPrice}
              />
            </Stack>
          </Stack>

          <ProductList products={product} />
        </Container>}
      <Stack className='pagination' spacing={3}> 
        <Pagination count={Math.ceil(productsCount / resultPerPage)} onChange={currentPerPageNo} shape="rounded" color='primary' />
      </Stack>
    </>
  );
}
