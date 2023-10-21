import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    product: [],
    productsCount: 0,
    error: {}
}
const productSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        allProductRequest(state) {
            state.loading = true
                state.product = []
        },
        allProductSuccess(state, action) {
            state.loading = false
                state.product = action.payload.product
                state.productsCount = action.payload.productsCount
                state.resultPerPage = action.payload.resultPerPage
                state.filterProductCount = action.payload.filterProductCount
        },
        allProductFail(state, action) {
            state.loading = false
                state.error = action.payload

        },
        clearError(state, action) {
            state = { ...state }
                state.error = action.payload

        }

    }
})


export default productSlice.reducer;

export const { allProductRequest, allProductSuccess, allProductFail, clearError } = productSlice.actions; 