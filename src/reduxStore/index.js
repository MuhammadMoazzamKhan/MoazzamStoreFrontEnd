import { configureStore } from "@reduxjs/toolkit";
import  productReducer  from "./slice/ProductSlice";
import ProductDetailSlice from "./slice/ProductDetailSlice";
import UserSlice from "./slice/UserSlice";

export const store = configureStore({
    reducer:{
        product: productReducer,
        productDetails : ProductDetailSlice,
        user : UserSlice,
    }
})
