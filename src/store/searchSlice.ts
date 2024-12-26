import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../types/data";


interface SearchQuery{
    searchQuery:string | OrderStatus | PaymentStatus | PaymentMethod
}

const initialState:SearchQuery={
    searchQuery:"",
}

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers:{
        setSearchQuery(state:SearchQuery,action:PayloadAction<string>){
            state.searchQuery=action.payload;
        }
    }
})
export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;