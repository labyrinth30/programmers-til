import { useRef, useState, type FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SIdeForm";
import { FiPlusCircle } from "react-icons/fi";
import { addButton, addSection, boardItem, boardItemActive, boardRow, container, title } from "./BoardList.css";
import clsx from "clsx";

type TBoardListProps = {
    activeBoardId: string;
    setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}

const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }: TBoardListProps) => {
    const { boardArray } = useTypedSelector((state) => state.boards);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        setIsFormOpen(!isFormOpen);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }


    return (
        <div className={container}>
            <div className={title}>
                게시판:
            </div>
            <div className={boardRow}>
                {boardArray.map((board, index) => (
                    <div key={board.boardId}
                        onClick={() => setActiveBoardId(boardArray[index].boardId)}
                        className={
                            clsx(
                                {
                                    [boardItemActive]:
                                        boardArray.findIndex(b => b.boardId === activeBoardId) === index,
                                },
                                {
                                    [boardItem]:
                                        boardArray.findIndex(b => b.boardId === activeBoardId) !== index,
                                }
                            )
                        }>
                        <div>
                            <div >
                                {board.boardName}
                            </div>
                        </div>
                    </div>
                ))}
                <div className={addSection}>
                    {isFormOpen ?
                        <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen} />
                        :
                        <FiPlusCircle className={addButton} onClick={handleClick} />
                    }
                </div>
            </div>
        </div>
    )
};

export default BoardList
