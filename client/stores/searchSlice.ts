import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Transaction } from "@/types/transaction";

export interface SearchState {
    search: string;
    startupTransactions: Transaction[];
}

const initialState: SearchState = {
    search: "",
    startupTransactions: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setStartupTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.startupTransactions = action.payload;
        },
    },
});

export const {setSearch, setStartupTransactions} = searchSlice.actions;
export default searchSlice.reducer;