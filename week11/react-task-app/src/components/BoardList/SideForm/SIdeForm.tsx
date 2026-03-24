import { useState, type ChangeEvent, type FC } from "react";
import { FiCheck } from "react-icons/fi";
import { icon } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardsSlice";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
    inputRef: React.RefObject<HTMLInputElement | null>;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideForm: FC<TSideFormProps> = ({ inputRef, setIsFormOpen }) => {
    const dispatch = useTypedDispatch();
    const [inputText, setInputText] = useState<string>('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }
    const handleOnBlur = () => {
        setIsFormOpen(false);
    }
    const handleClick = () => {
        if (inputText) {
            dispatch(
                addBoard({
                    board: {
                        boardId: `board-${Date.now()}`,
                        boardName: inputText,
                        lists: [],
                    }
                })
            );

            dispatch(
                addLog({
                    logId: `log-${Date.now()}`,
                    logAuthor: 'User',
                    logMessage: `게시판 ${inputText} 생성됨`,
                    logTimestamp: Date.now().toString(),
                })
            )
        }
    }
    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                placeholder="새로운 게시판 등록하기"
                value={inputText}
                onChange={handleChange}
                onBlur={handleOnBlur}
            />
            <FiCheck className={icon} onMouseDown={handleClick} />
        </div>
    )
}
export default SideForm
