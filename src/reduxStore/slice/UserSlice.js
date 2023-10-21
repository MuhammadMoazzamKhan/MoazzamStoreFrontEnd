import { createSlice } from "@reduxjs/toolkit";



const UserSlice = createSlice({
    name: "User",
    initialState: {},
    reducers: {
        loginRequest(state) {
            state.loading = true
            state.isAuthenticated = false
        },
        loginSuccess(state, action) {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
            state.error = null
            state = { ...state }
        },
        loginFail(state, action) {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.error = action.payload
            state = { ...state }
        },
        LoadUserFail(state, action) {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.error = action.payload
        },
        logoutSuccess(state){
            state.loading = false
            state.isAuthenticated = false
            state.user = null
        },
        logoutFail(state ,action){
            state.loading = false
            state.error = action.payload
            state = { ...state }
        }

    }
})


export default UserSlice.reducer;

export const { loginRequest, loginSuccess, loginFail ,LoadUserFail,logoutSuccess,logoutFail} = UserSlice.actions; 