import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[];
}

type TAddBoardAction = {
    board: IBoard;
}

type TDeleteBoardAction = {
    boardId: string;
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

type TUpdateTaskAction = {
    boardId: string;
    listId: string;
    task: ITask;
}

type TDeleteTaskAction = {
    boardId: string;
    listId: string;
    taskId: string;
}

type TSortAction = {
    boardIndex: number;
    droppableIdStart: string;
    droppableIdEnd: string;
    droppableIndexStart: number;
    droppableIndexEnd: number;
    draggableId: string;
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
        deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
            state.boardArray = state.boardArray.filter(board => board.boardId !== payload.boardId);
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
        },
        updateTask: (state, { payload }: PayloadAction<TUpdateTaskAction>) => {
            state.boardArray = state.boardArray.map(
                board => board.boardId === payload.boardId
                    ? {
                        ...board,
                        lists: board.lists.map((list) =>
                            list.listId === payload.listId
                                ? {
                                    ...list,
                                    tasks: list.tasks.map((task) =>
                                        task.taskId === payload.task.taskId
                                            ? payload.task
                                            : task
                                    )
                                }
                                : list
                        )
                    }
                    : board
            )
        },
        deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
            state.boardArray = state.boardArray.map(
                board => board.boardId === payload.boardId
                    ? {
                        ...board,
                        lists: board.lists.map((list) =>
                            list.listId === payload.listId
                                ? {
                                    ...list,
                                    tasks: list.tasks.filter((task) =>
                                        task.taskId !== payload.taskId
                                    )
                                }
                                : list
                        )
                    }
                    : board
            )
        },
        sort(state, { payload }: PayloadAction<TSortAction>) {
            // same list
            if (payload.droppableIdStart === payload.droppableIdEnd) {
                const list = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                )
                // 변경시키는 아이템을 배열에서 지워주고, 변경시키는 아이템을 반환함
                const card = list?.tasks.splice(payload.droppableIndexStart, 1)[0];
                // 변경시키는 아이템을 원하는 인덱스에 넣어줌
                list?.tasks.splice(payload.droppableIndexEnd, 0, card!);
            }

            // other list
            if (payload.droppableIdStart !== payload.droppableIdEnd) {
                const startList = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                )
                const endList = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdEnd
                )
                const card = startList?.tasks.splice(payload.droppableIndexStart, 1)[0];
                endList?.tasks.splice(payload.droppableIndexEnd, 0, card!);
            }
        }
    }
})

export const { addBoard, deleteBoard, deleteList, setModalActive, addList, addTask, updateTask, deleteTask, sort } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
