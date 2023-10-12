import { configureStore } from "@reduxjs/toolkit";
import  productReducer  from "./slice/ProductSlice";

export const store = configureStore({
    reducer:{
        product: productReducer
    }
})
