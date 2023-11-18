import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${({ theme: { cardColor }, isDragging }) =>
    isDragging ? "#0fbcf9" : cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-top: 10px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? "10px 12px 15px rgba(0, 0, 0, 1)" : "none"};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  console.log(toDoId, " has been rendered~~~");

  return (
    <>
      <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
        {/* 버그를 방지하기 위해 key값에는 index값이 아닌 draggableId와 같은 toDo를 줘야함 */}

        {(magic, snapshot) => {
          // console.log(magic);
          return (
            <Card
              isDragging={snapshot.isDragging}
              ref={magic.innerRef}
              {...magic.draggableProps}
            >
              <span {...magic.dragHandleProps}>❤</span>
              {toDoText}
            </Card>
            //dragHandleProps를 준 요소만 드래그 가능
          );
        }}
      </Draggable>
    </>
  );
}

// export default DraggableCard;
export default React.memo(DraggableCard);
//prop이 변하지 않았다면 리렌더 하지 않도록 하기위함
