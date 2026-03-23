import type { RootState, AppDispatch } from "../store";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";



const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const logger = useTypedSelector(state => state.logger);
export const boards = useTypedSelector(state => state.boards);
export const modal = useTypedSelector(state => state.modal);