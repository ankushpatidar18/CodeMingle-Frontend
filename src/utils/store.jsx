import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import requestReducer from './slices/requestSlice'
import connectionReducer from './slices/connectionSlice'
const store = configureStore({
    reducer : {
         user : userReducer,
         requests : requestReducer,
         connections : connectionReducer
    },
})

export default store;