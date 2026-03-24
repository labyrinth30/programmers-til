import { useState, type FC } from "react";
import DropDownForm from "./DropDownForm/DropDownForm";
import { IoIosAdd } from "react-icons/io";
import { listButton, taskButton } from "./ActionButton.css";

type TActionButtonProps = {
    listId: string;
    boardId: string;
    list?: boolean;
}

const ActionButton: FC<TActionButtonProps> = ({ listId, boardId, list }: TActionButtonProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const buttonText = list ? "새로운 리스트 등록" : "새로운 일 등록";
    return isFormOpen ? (
        <DropDownForm
            setIsFormOpen={setIsFormOpen}
            listId={listId}
            boardId={boardId}
            list={list ? true : false}
        />
    ) :
        (
            <div
                onClick={() => setIsFormOpen(true)}
                className={list ? listButton : taskButton}>
                <IoIosAdd />
                <p>{buttonText}</p>
            </div>
        )
}
export default ActionButton
