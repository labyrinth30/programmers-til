import { useState } from 'react';
import { appContainer, board, buttons } from './App.css.ts'
import BoardList from './components/BoardList/BoardList.tsx';
import ListContainer from './components/ListsContainer/ListContainer.tsx';
import { useTypedSelector } from './hooks/redux';

function App() {
  const [activeBoardId, setActiveBoardId] = useState<string>('board-0');

  const boards = useTypedSelector((state) => state.boards.boardArray);
  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId);

  const lists = getActiveBoard[0].lists;

  return (
    <div className={appContainer}>
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListContainer lists={lists} boardId={activeBoardId} />
      </div>
      <div className={buttons}>
        <button>
          이 게시판 삭제하기
        </button>
        <button>
          이 게시판 이름 바꾸기
        </button>
      </div>
    </div>
  )
}

export default App
