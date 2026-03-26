import { useState } from 'react';
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css.ts'
import BoardList from './components/BoardList/BoardList.tsx';
import ListContainer from './components/ListsContainer/ListContainer.tsx';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import EditModal from './components/EditModal/EditModal.tsx';
import LoggerModal from './components/LoggerModal/LoggerModal.tsx';
import { deleteBoard, sort } from './store/slices/boardsSlice.ts';
import { addLog } from './store/slices/loggerSlice.ts';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { v4 } from 'uuid';


function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState<string>('board-0');
  const modalActive = useTypedSelector((state) => state.modal.modalActive);

  const boards = useTypedSelector((state) => state.boards.boardArray);
  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId);

  const lists = getActiveBoard[0].lists;

  const handleDeleteboard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard[0].boardId }));
      dispatch(
        addLog({
          logId: Date.now().toString(),
          logAuthor: "User",
          logMessage: `${getActiveBoard[0].boardName} 게시판 삭제됨`,
          logTimestamp: new Date().toISOString(),
        })
      );

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          board => board.boardId === activeBoardId
        );
        return indexToBeDeleted === 0 ? indexToBeDeleted + 1 : indexToBeDeleted - 1;
      }

      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert("최소 1개의 게시판은 존재해야 합니다.");
    }

  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceList = lists.filter(list => list.listId === source.droppableId)[0];

    dispatch(
      sort({
        boardIndex: boards.findIndex(board => board.boardId === activeBoardId),
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId,
      })
    )

    dispatch(
      addLog({
        logId: v4(),
        logAuthor: "User",
        logMessage: `${sourceList.tasks.filter(task => task.taskId === draggableId)[0].taskName} 작업이 ${destination.droppableId}로 이동됨`,
        logTimestamp: new Date().toISOString(),
      })
    )
  }

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListContainer lists={lists} boardId={activeBoardId} />
        </DragDropContext>
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteboard}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  )
}

export default App
