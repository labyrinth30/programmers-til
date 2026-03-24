import { type FC, type Dispatch, type SetStateAction, useState } from "react";
import { FiX } from "react-icons/fi";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { v4 } from "uuid";
import { useTypedDispatch } from "../../../hooks/redux";
import { addLog } from "../../../store/slices/loggerSlice";
import { button, buttons, close, input, listForm, taskForm } from "./DropDownForm.css";

type TDropDownFormProps = {
    listId: string;
    boardId: string;
    list?: boolean;
    setIsFormOpen: Dispatch<SetStateAction<boolean>>
}


const DropDownForm: FC<TDropDownFormProps> =
    ({ listId, boardId, list, setIsFormOpen }: TDropDownFormProps) => {
        const dispatch = useTypedDispatch();
        const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setText(e.target.value);
        }
        const [text, setText] = useState<string>("");
        const formPlaceholder = list ? '리스트의 제목을 입력하세요.' : '일의 제목을 입력하세요.';

        const buttonTitle = list ? '리스트 추가' : '일 추가';
        const handleButtonClick = () => {
            if (text) {
                if (list) {
                    dispatch(
                        addList({
                            boardId,
                            list: {
                                listId: v4(),
                                listName: text,
                                tasks: [],
                            },
                        })
                    );
                    dispatch(
                        addLog({
                            logId: v4(),
                            logMessage: `리스트 생성하기: ${text}`,
                            logAuthor: "User",
                            logTimestamp: String(Date.now()),
                        })
                    )
                } else {
                    dispatch(
                        addTask(
                            {
                                boardId,
                                listId,
                                task: {
                                    taskId: v4(),
                                    taskName: text,
                                    taskDescription: "",
                                    taskOwner: "User",
                                }
                            }
                        )
                    );
                    dispatch(
                        addLog({
                            logId: v4(),
                            logMessage: `일 생성하기: ${text}`,
                            logAuthor: "User",
                            logTimestamp: String(Date.now()),
                        })
                    )
                }
            }
        }
        return (
            <div className={list ? listForm : taskForm}>
                <textarea
                    className={input}
                    autoFocus
                    value={text}
                    onChange={handleTextChange}
                    placeholder={formPlaceholder}
                    onBlur={() => setIsFormOpen(false)}
                />
                <div className={buttons}>
                    <button className={button} onMouseDown={handleButtonClick}>{buttonTitle}</button>
                </div>
                <FiX className={close} />
            </div>
        )
    }
export default DropDownForm


