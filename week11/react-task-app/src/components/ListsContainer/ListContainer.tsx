import type { IList } from "../../types";
import ActionButton from "../ActionButton/ActionButton";
import List from "../List/List";
import { listsContainer } from "./ListsContainer.css";

type TListContainerProps = {
    lists: IList[];
    boardId: string;
}

const ListContainer = ({ lists, boardId }: TListContainerProps) => {
    return (
        <div className={listsContainer}>
            {lists.map(list => (
                <List
                    key={list.listId}
                    list={list}
                    boardId={boardId}
                />
            ))}
            <ActionButton listId={""} boardId={boardId} list/>
        </div>
    )
}
export default ListContainer
