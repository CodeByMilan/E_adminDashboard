import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import authSlice from "./authSlice";
import searchSlice from "./searchSlice";


const store =configureStore({
    reducer: {
        datas:dataSlice,
        auth:authSlice,
        search:searchSlice
    }
})

export default store; 
export type AppDispatch = typeof store.dispatch;
export type RootState=ReturnType<typeof store.getState>