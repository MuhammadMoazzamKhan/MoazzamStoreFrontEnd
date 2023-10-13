import { configureStore } from "@reduxjs/toolkit";
import  productReducer  from "./slice/ProductSlice";
import ProductDetailSlice from "./slice/ProductDetailSlice";

export const store = configureStore({
    reducer:{
        product: productReducer,
        productDetails : ProductDetailSlice
    }
})
