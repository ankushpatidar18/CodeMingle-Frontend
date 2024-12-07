import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import requestReducer from './slices/requestSlice'
const store = configureStore({
    reducer : {
         user : userReducer,
         requests : requestReducer
    },
})

export default store;