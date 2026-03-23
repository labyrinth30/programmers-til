import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer,
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (selector: (state: RootState) => any) => useSelector(selector);

export default store;
