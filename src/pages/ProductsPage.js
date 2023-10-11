import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import storeContext from '../store/storeContext';

// components
import {  ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';


export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
    const context = useContext(storeContext);
    const {filter,product} = context;



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

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          { filter || "Products"}
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
      </Container>
    </>
  );
}
