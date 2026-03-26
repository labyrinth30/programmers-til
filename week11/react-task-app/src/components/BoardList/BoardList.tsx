import { useRef, useState, type FC } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SIdeForm";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import { addButton, addSection, boardItem, boardItemActive, boardRow, container, title } from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

type TBoardListProps = {
    activeBoardId: string;
    setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}

const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }: TBoardListProps) => {

    const dispatch = useTypedDispatch();
    const { boardArray } = useTypedSelector((state) => state.boards);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        setIsFormOpen(!isFormOpen);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleLogout = () => {
        signOut(auth);
    }

    const { isAuth } = useAuth();


    const handleLogin = () => {
        signInWithPopup(auth, provider).then(userCredential => {
            const user = userCredential.user;
            dispatch(setUser({
                email: user.email,
                id: user.uid,
            }));
        }).catch(error => {
            console.error(error);
        })
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(setUser({
                email: '',
                id: '',
            }));
        }).catch(error => {
            console.error(error);
        })
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
                    {isAuth
                        ? <GoSignOut className={addButton} onClick={handleLogout} />
                        : <FiLogIn className={addButton} onClick={handleLogin} />
                    }
                </div>
            </div>
        </div>
    )
};

export default BoardList
