import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[];
}

type TAddBoardAction = {
    board: IBoard;
}

type TDeleteListAction = {
    boardId: string;
    listId: string;
}

type TAddListAction = {
    boardId: string;
    list: IList;
}

type TAddTaskAction = {
    boardId: string;
    listId: string;
    task: ITask;
}

const initialState: TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId: 'board-0',
            boardName: '첫 번째 게시물',
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
        addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.board);
        },
        deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map(
                board => board.boardId === payload.boardId
                    ? {
                        ...board,
                        lists: board.lists.filter(list => list.listId !== payload.listId)
                    }
                    : board
            )
        },
        setModalActive: (state, { payload }: PayloadAction<boolean>) => {
            state.modalActive = payload;
        },
        addList: (state, { payload }: PayloadAction<TAddListAction>) => {
            state.boardArray = state.boardArray.map(
                board => board.boardId === payload.boardId
                    ? {
                        ...board,
                        lists: [...board.lists, payload.list]
                    }
                    : board
            )
        },
        addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
            state.boardArray = state.boardArray.map(
                board => board.boardId === payload.boardId
                    ? {
                        ...board,
                        lists: board.lists.map((list) =>
                            list.listId === payload.listId
                                ? {
                                    ...list,
                                    tasks: [...list.tasks, payload.task]
                                }
                                : list
                        )
                    }
                    : board
            )
        }
    }
})

export const { addBoard, deleteList, setModalActive, addList, addTask } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
