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

const Title = styled.h2`
  text-align: center;
  font-weight: 600;

  font-size: 18px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

//boardId는 recoil toDoState default object key
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => {
          //   console.log(magic);
          return (
            <div
              ref={magic.innerRef}
              {...magic.droppableProps}
              style={{ fontSize: "20px" }}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard key={toDo} toDo={toDo} index={index} />
              ))}
              {magic.placeholder}
              {/* placeholder를 사용하면 드래그할 때 Droppable 크기가 고정 */}
            </div>
          );
        }}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
