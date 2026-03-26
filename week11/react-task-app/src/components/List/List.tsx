import { GrSubtract } from "react-icons/gr";
import type { IList, ITask } from "../../types";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";
import { Droppable } from "@hello-pangea/dnd";

type TListProps = {
    list: IList;
    boardId: string;
}

const List = ({ list, boardId }: TListProps) => {
    const dispatch = useTypedDispatch();

    const handleTaskChange = (
        boardId: string,
        listId: string,
        task: ITask
    ) => {
        dispatch(
            setModalData({
                boardId,
                listId,
                task
            })
        )
        dispatch(setModalActive(true));
    }

    const handleListDelete = (listId: string) => {
        dispatch(deleteList({ boardId, listId }));
        dispatch(
            addLog({
                logId: `log-${Date.now()}`,
                logMessage: `List ${list.listName} deleted`,
                logAuthor: "User",
                logTimestamp: new Date().toISOString(),
            })
        );
    }
    return (
        <Droppable droppableId={list.listId}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={listWrapper}>
                    <div className={header}>
                        <div className={name}>
                            {list.listName}
                        </div>
                <GrSubtract
                    className={deleteButton}
                    onClick={() => handleListDelete(list.listId)} />
            </div>
            {list.tasks.map((task, index) => (
                <div
                    onClick={() => handleTaskChange(boardId, list.listId, task)}
                    key={task.taskId}>
                    <Task
                        taskName={task.taskName}
                        taskDescription={task.taskDescription}
                        id={task.taskId}
                        boardId={boardId}
                        index={index}
                    />
                </div>
            ))}
            {provided.placeholder}
            <ActionButton listId={list.listId} boardId={boardId} />
        </div>
            )}
        </Droppable>
    )
}
export default List
