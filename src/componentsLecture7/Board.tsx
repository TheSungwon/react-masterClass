import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.div`
  background-color: ${({ theme: { boardColor } }) => {
    console.log(boardColor);
    return boardColor;
  }};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;

  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${({ isDraggingOver, draggingFromThisWith }) =>
    isDraggingOver
      ? "#dfe6e9"
      : draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 1s ease-in-out;
  padding: 20px;
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
        {(magic, info) => {
          //snapshot => info로 변경
          // snapshot.isDraggingOver 드래그해서 들어왔는지 boolean으로 확인
          // snapshot.draggingFromThisWith 드래그 했는지
          //   console.log(magic);
          return (
            <Area
              isDraggingOver={info.isDraggingOver}
              draggingFromThisWith={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard key={toDo} toDo={toDo} index={index} />
              ))}
              {magic.placeholder}
              {/* placeholder를 사용하면 드래그할 때 Droppable 크기가 고정 */}
            </Area>
          );
        }}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
