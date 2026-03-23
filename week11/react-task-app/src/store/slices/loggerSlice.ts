import { createSlice } from "@reduxjs/toolkit";
import type { IlogItem } from "../../types";

type loggerState = {
    logArray: IlogItem[]
}

const initialState: loggerState = {
    logArray: [],
}

const loggerSlice = createSlice({
    name: "logger",
    initialState,
    reducers: {

    }
})

export const loggerReducer = loggerSlice.reducer;
