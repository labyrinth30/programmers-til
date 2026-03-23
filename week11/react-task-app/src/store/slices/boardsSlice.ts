import { createSlice } from "@reduxjs/toolkit";
import type { IBoard } from "../../types";

type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[];
}

const initialState: TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId: 'board-0',
            boardName: 'Board 0',
            lists: [
                {
                    listId: 'list-0',
                    listName: 'List 1',
                    tasks: [
                        {
                            taskId: 'task-0',
                            taskName: 'Task 1',
                            taskDescription: 'Task 1 Description',
                            taskOwner: 'John Doe',
                        },
                        {
                            taskId: 'task-1',
                            taskName: 'Task 2',
                            taskDescription: 'Task 2 Description',
                            taskOwner: 'Jane Doe',
                        },
                        {
                            taskId: 'task-2',
                            taskName: 'Task 3',
                            taskDescription: 'Task 3 Description',
                            taskOwner: 'Bob Smith',
                        }
                    ]
                },
                {
                    listId: 'list-1',
                    listName: 'List 2',
                    tasks: [
                        {
                            taskId: 'task-3',
                            taskName: 'Task 4',
                            taskDescription: 'Task 4 Description',
                            taskOwner: 'Alice Johnson',
                        },
                        {
                            taskId: 'task-4',
                            taskName: 'Task 5',
                            taskDescription: 'Task 5 Description',
                            taskOwner: 'Bob Smith',
                        },
                    ]
                }
            ]
        }
    ],
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {

    }
})

export const boardsReducer = boardsSlice.reducer;
