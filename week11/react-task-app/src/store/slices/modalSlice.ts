import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask } from "../../types";

type TSetModalDataAction = {
    boardId: string;
    listId: string;
    task: ITask;
}

type TModalState = {
    boardId: string;
    listId: string;
    task: ITask;
    modalActive: boolean;
}

const initialState: TModalState = {
    boardId: "board-0",
    listId: "list-0",
    task: {
        taskId: "task-0",
        taskName: "task-0",
        taskDescription: "task-0-description",
        taskOwner: "John Doe",
    },
    modalActive: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalData: (
            state,
            { payload }: PayloadAction<TSetModalDataAction>
        ) => {
            state.boardId = payload.boardId;
            state.listId = payload.listId;
            state.task = payload.task;
        }
    }
})

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;