import axios from "axios";
import { allProductFail, allProductRequest, allProductSeccess, clearError } from "../slice/ProductSlice";


export const clearErrors = async (dispatch) => {
dispatch({type:clearError})    
}
