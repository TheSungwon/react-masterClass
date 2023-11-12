import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.div`
  background-color: ${({ theme: { boardColor } }) => {
    console.log(boardColor);
    return boardColor;
  }};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

//boardId는 recoil toDoState default object key
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => {
        //   console.log(magic);
        return (
          <Wrapper
            ref={magic.innerRef}
            {...magic.droppableProps}
            style={{ fontSize: "20px" }}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
            {/* placeholder를 사용하면 드래그할 때 Droppable 크기가 고정 */}
          </Wrapper>
        );
      }}
    </Droppable>
  );
}

export default Board;
