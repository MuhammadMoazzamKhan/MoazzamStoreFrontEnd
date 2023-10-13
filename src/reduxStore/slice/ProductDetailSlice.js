import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    product: [],
    error: {}
}
const productDetailSlice = createSlice({
    name: "ProductDetails",
    initialState,
    reducers: {
        productDetailsRequest(state) {
            state.loading = true
        },
        productDetailsSeccess(state, action) {
            state.loading = false
            state.product = action.payload.product
        },
        productDetailsFail(state, action) {
            state.loading = false
            state.error = action.payload

        },
        clearError(state, action) {
            state = { ...state }
            state.error = action.payload

        }

    }
})

export const { productDetailsRequest, productDetailsSeccess, productDetailsFail, clearError } = productDetailSlice.actions; 

export default productDetailSlice.reducer;
